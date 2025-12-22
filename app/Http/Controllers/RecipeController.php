<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Recipe;
use App\Models\Category;
use App\Models\Direction;
use App\Models\Ingredient;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreRecipeRequest;
use App\Http\Requests\UpdateRecipeRequest;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::with('category:id,title,color')->latest()->get();

        return Inertia::render("recipes/index", [
            'recipes' => $recipes,
        ]);
    }

    public function create() {
        $categories = Category::select("id","title")->latest()->get();
        return Inertia::render("recipes/create",[
            'categories'=>$categories,
        ]);
    }

    public function store(StoreRecipeRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            // Handle image upload
            $imagePath = null;
            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                $filename = time() . '_' . Str::slug($validated['title']) . '.' . $request->image->extension();
                $imagePath = $request->file('image')->storeAs('recipes', $filename, 'public');
            }

            // Generate slug
            $slug = Str::slug($validated['title']);
            $slugCount = Recipe::where('slug', $slug)->count();
            if ($slugCount > 0) {
                $slug = $slug . '-' . ($slugCount + 1);
            }

            // Create recipe
            $recipe = Recipe::create([
                'title' => $validated['title'],
                'user_id' => Auth::id(),
                'slug' => $slug,
                'short_description' => $validated['short_description'],
                'image' => $imagePath,
                'category_id' => $validated['category_id'],
                'prep_time' => $validated['prep_time'],
                'cook_time' => $validated['cook_time'],
            ]);

            // Handle ingredients
            foreach ($validated['ingredients'] as $ingredientData) {
                // Create or find ingredient
                $ingredient = Ingredient::firstOrCreate(
                    ['title' => $ingredientData['title']],
                    ['short_description' => $ingredientData['short_description'] ?? null]
                );

                // Attach ingredient to recipe with pivot data
                $recipe->ingredients()->attach($ingredient->id, [
                    'title' => $ingredientData['title'],
                    'description' => $ingredientData['short_description'] ?? null,
                ]);
            }

            // Handle directions
            foreach ($validated['directions'] as $index => $directionData) {
                Direction::create([
                    'recipe_id' => $recipe->id,
                    'title' => $directionData['title'] ?? "Step " . ($index + 1),
                    'short_description' => $directionData['short_description'],
                ]);
            }

            DB::commit();

            return redirect()->route('recipes.index')
                ->with('success', 'Recipe created successfully!')
                ->with('recipe', $recipe);

        } catch (\Exception $e) {
            DB::rollBack();
            
            \Log::error('Recipe creation failed: ' . $e->getMessage(), [
                'request' => $request->except(['image']),
            ]);
            
            if (isset($imagePath) && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }

            return redirect('/recipes')
                ->withInput()
                ->with('error', 'Failed to create recipe. Please try again.');
        }
    }

    public function edit(Recipe $recipe)
    {
        $recipe->load(['ingredients', 'directions']);
        $categories = Category::all(['id', 'title']);

        return Inertia::render('recipes/edit', [
            'recipe' => $recipe,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateRecipeRequest $request, Recipe $recipe)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            if ($request->has('remove_image') && $request->boolean('remove_image')) {
                if ($recipe->image && Storage::disk('public')->exists($recipe->image)) {
                    Storage::disk('public')->delete($recipe->image);
                }
                $imagePath = null;
            } else {
                $imagePath = $recipe->image;
                
                if ($request->hasFile('image') && $request->file('image')->isValid()) {
                    if ($recipe->image && Storage::disk('public')->exists($recipe->image)) {
                        Storage::disk('public')->delete($recipe->image);
                    }
                    
                    $filename = time() . '_' . Str::slug($validated['title']) . '.' . $request->image->extension();
                    $imagePath = $request->file('image')->storeAs('recipes', $filename, 'public');
                }
            }
            
            $slug = $recipe->slug;
            if ($recipe->title !== $validated['title']) {
                $slug = Str::slug($validated['title']);
                $slugCount = Recipe::where('slug', $slug)
                    ->where('id', '!=', $recipe->id)
                    ->count();

                if ($slugCount > 0) {
                    $slug = $slug . '-' . ($slugCount + 1);
                }
            }

            $recipe->update([
                'title' => $validated['title'],
                'user_id' => Auth::id(),
                'slug' => $slug,
                'short_description' => $validated['short_description'],
                'image' => $imagePath,
                'category_id' => $validated['category_id'],
                'prep_time' => $validated['prep_time'],
                'cook_time' => $validated['cook_time'],
            ]);

            $ingredientPivotData = [];
            
            foreach ($validated['ingredients'] as $index => $ingredientData) {
                if (isset($ingredientData['id'])) {
                    $ingredient = Ingredient::find($ingredientData['id']);
                    if ($ingredient) {
                        $ingredient->update([
                            'title' => $ingredientData['title'],
                            'short_description' => $ingredientData['short_description'] ?? null,
                        ]);
                        $ingredientId = $ingredient->id;
                    } else {
                        $ingredient = Ingredient::create([
                            'title' => $ingredientData['title'],
                            'short_description' => $ingredientData['short_description'] ?? null,
                        ]);
                        $ingredientId = $ingredient->id;
                    }
                } else {
                    $ingredient = Ingredient::create([
                        'title' => $ingredientData['title'],
                        'short_description' => $ingredientData['short_description'] ?? null,
                    ]);
                    $ingredientId = $ingredient->id;
                }
                
                $ingredientPivotData[$ingredientId] = [
                    'title' => $ingredientData['title'],
                    'description' => $ingredientData['short_description'] ?? null,
                ];
            }

            $recipe->ingredients()->sync($ingredientPivotData);

            $existingDirectionIds = $recipe->directions()->pluck('id')->toArray();
            $submittedDirectionIds = [];
            
            foreach ($validated['directions'] as $index => $directionData) {
                if (isset($directionData['id']) && in_array($directionData['id'], $existingDirectionIds)) {
                    $direction = Direction::find($directionData['id']);
                    if ($direction) {
                        $direction->update([
                            'title' => $directionData['title'] ?? "Step " . ($index + 1),
                            'short_description' => $directionData['short_description'],
                            'order' => $index + 1,
                        ]);
                        $submittedDirectionIds[] = $direction->id;
                    }
                } else {
                    $direction = Direction::create([
                        'recipe_id' => $recipe->id,
                        'title' => $directionData['title'] ?? "Step " . ($index + 1),
                        'short_description' => $directionData['short_description'],
                        'order' => $index + 1,
                    ]);
                    $submittedDirectionIds[] = $direction->id;
                }
            }

            $directionsToDelete = array_diff($existingDirectionIds, $submittedDirectionIds);
            if (!empty($directionsToDelete)) {
                Direction::whereIn('id', $directionsToDelete)->delete();
            }

            DB::commit();

            $recipe->refresh();
            $recipe->load(['category', 'ingredients', 'directions']);

            return redirect('/recipes')
                ->with('success', 'Recipe updated successfully!')
                ->with('recipe', $recipe);

        } catch (\Exception $e) {
            DB::rollBack();
            
            \Log::error('Recipe update failed: ' . $e->getMessage(), [
                'recipe_id' => $recipe->id,
                'request' => $request->except(['image']),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update recipe. Please try again.');
        }
    }

    public function destroy(Recipe $recipe)
    {
        DB::beginTransaction();

        try {
            if ($recipe->image && Storage::disk('public')->exists($recipe->image)) {
                Storage::disk('public')->delete($recipe->image);
            }

            $recipe->ingredients()->detach();
            $recipe->directions()->delete();
            $recipe->delete();

            DB::commit();

            return redirect("recipes")
                ->with('success', 'Recipe deleted successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            
            \Log::error('Recipe deletion failed: ' . $e->getMessage(), [
                'recipe_id' => $recipe->id,
            ]);

            return redirect()->back()
                ->with('error', 'Failed to delete recipe. Please try again.');
        }
    }
}
