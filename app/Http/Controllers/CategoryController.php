<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::latest()->get();

        return Inertia::render("categories/index",[
            'categories'=>$categories,
        ]);
    }

    public function create() {
        return Inertia::render('categories/create');
    }

    public function store(StoreCategoryRequest $request)
    {
        $validated = $request->validated();

        try {
            
            $imagePath = null;
            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                $filename = time() . '_' . Str::slug($request->title) . '.' . $request->image->extension();
                $imagePath = $request->file('image')->storeAs('categories', $filename, 'public');
            }
            
            $slug = Str::slug($validated['title']);
            $slugCount = Category::where('slug', $slug)->count();

            if ($slugCount > 0) {
                $slug = $slug . '-' . ($slugCount + 1);
            }
            
            $category = Category::create([
                'user_id' => Auth::id(),
                'title' => $validated['title'],
                'slug' => $slug,
                'color' => $validated['color'],
                'image' => $imagePath, 
            ]);
            
            return redirect('/categories')->with('success', 'Category created successfully!')
                ->with('category', $category);

        } catch (\Exception $e) {
            // Log the error
            \Log::error('Category creation failed: ' . $e->getMessage(), [
                'request' => $request->all(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create category. Please try again.');
        }
    }


    public function edit(Category $category) {
        return Inertia::render('categories/edit', [
        'category' => [
            'id' => $category->id,
            'title' => $category->title,
            'color' => $category->color,
            'image_url' => $category->image ? Storage::url($category->image) : null,
        ],
    ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $validated = $request->validated();
        
        try {
            
            if ($request->has('remove_image') && $request->boolean('remove_image')) {
                if ($category->image && Storage::disk('public')->exists($category->image)) {
                    Storage::disk('public')->delete($category->image);
                }
                $imagePath = null;
            } else {
                $imagePath = $category->image;
                
                if ($request->hasFile('image') && $request->file('image')->isValid()) {
                    if ($category->image && Storage::disk('public')->exists($category->image)) {
                        Storage::disk('public')->delete($category->image);
                    }
                    $filename = time() . '_' . Str::slug($validated['title']) . '.' . $request->image->extension();
                    $imagePath = $request->file('image')->storeAs('categories', $filename, 'public');
                }
            }
            
            $slug = $category->slug;
            if ($category->title !== $validated['title']) {
                $slug = Str::slug($validated['title']);
                $slugCount = Category::where('slug', $slug)
                    ->where('id', '!=', $category->id)
                    ->count();

                if ($slugCount > 0) {
                    $slug = $slug . '-' . ($slugCount + 1);
                }
            }
            
            $category->update([
                'user_id' => Auth::id(),
                'title' => $validated['title'],
                'slug' => $slug,
                'color' => $validated['color'],
                'image' => $imagePath,
            ]);

            return redirect('/categories')
                ->with('success', 'Category updated successfully!')
                ->with('category', $category);

        } catch (\Exception $e) {
            // Log the error
            \Log::error('Category update failed: ' . $e->getMessage(), [
                'category_id' => $category->id,
                'request' => $request->all(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update category. Please try again.');
        }
    }


    /**
     * Remove the specified category from storage.
     */
    public function destroy(Category $category)
    {
        try {
            // Delete the associated image if it exists
            if ($category->image && Storage::disk('public')->exists($category->image)) {
                Storage::disk('public')->delete($category->image);
            }
            
            $category->delete();

            return redirect('/categories')
                ->with('success', 'Category deleted successfully.');

        } catch (\Exception $e) {
            \Log::error('Category deletion failed: ' . $e->getMessage(), [
                'category_id' => $category->id,
            ]);

            return redirect()->back()
                ->with('error', 'Failed to delete category. Please try again.');
        }
    }

}
