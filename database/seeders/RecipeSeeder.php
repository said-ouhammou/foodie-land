<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Recipe;
use App\Models\Category;
use App\Models\Direction;
use App\Models\Ingredient;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        // Get all categories
        $user = User::first();
        $categories = Category::all();
        
        if ($categories->isEmpty()) {
            // Create some categories if they don't exist
            $categories = Category::factory()->count(5)->create();
        }

        // Sample recipes
        $recipes = [
            [
                'title' => 'Classic Spaghetti Carbonara',
                'short_description' => 'A traditional Italian pasta dish with eggs, cheese, and pancetta.',
                'prep_time' => 15,
                'cook_time' => 20,
                'featured' => 1,
                'directions' => [
                    ['title' => 'Prepare Ingredients', 'short_description' => 'Chop the pancetta, grate the Parmesan cheese, and beat the eggs in a bowl.'],
                    ['title' => 'Cook Pasta', 'short_description' => 'Cook spaghetti in salted boiling water until al dente. Reserve 1 cup of pasta water.'],
                    ['title' => 'Cook Pancetta', 'short_description' => 'In a pan, cook pancetta until crispy. Remove from heat.'],
                    ['title' => 'Combine', 'short_description' => 'Mix hot pasta with pancetta, then quickly stir in egg mixture. Add pasta water to create sauce.'],
                    ['title' => 'Serve', 'short_description' => 'Top with extra Parmesan and black pepper. Serve immediately.'],
                ],
                'ingredients' => [
                    ['name' => 'Pasta', 'description' => '400g spaghetti'],
                    ['name' => 'Eggs', 'description' => '3 large eggs + 2 yolks'],
                    ['name' => 'Cheese', 'description' => '100g grated Parmesan'],
                    ['name' => 'Pancetta', 'description' => '150g pancetta, diced'],
                    ['name' => 'Black Pepper', 'description' => 'Freshly ground'],
                    ['name' => 'Salt', 'description' => 'For pasta water'],
                ],
            ],
            [
                'title' => 'Vegetable Stir Fry',
                'short_description' => 'Quick and healthy vegetable stir fry with tofu in a savory sauce.',
                'prep_time' => 20,
                'cook_time' => 15,
                'directions' => [
                    ['title' => 'Prep Vegetables', 'short_description' => 'Chop all vegetables into bite-sized pieces. Press and cube tofu.'],
                    ['title' => 'Make Sauce', 'short_description' => 'Mix soy sauce, garlic, ginger, and cornstarch in a bowl.'],
                    ['title' => 'Stir Fry', 'short_description' => 'Stir fry vegetables in hot oil until crisp-tender. Add tofu and sauce.'],
                    ['title' => 'Thicken', 'short_description' => 'Cook until sauce thickens and coats everything evenly.'],
                    ['title' => 'Garnish', 'short_description' => 'Top with sesame seeds and green onions. Serve with rice.'],
                ],
                'ingredients' => [
                    ['name' => 'Bell Pepper', 'description' => '1 red, 1 yellow, sliced'],
                    ['name' => 'Broccoli', 'description' => '2 cups florets'],
                    ['name' => 'Carrot', 'description' => '2 medium, sliced'],
                    ['name' => 'Onion', 'description' => '1 large, sliced'],
                    ['name' => 'Tofu', 'description' => '400g firm tofu, cubed'],
                    ['name' => 'Garlic', 'description' => '3 cloves, minced'],
                    ['name' => 'Soy Sauce', 'description' => '3 tablespoons'],
                    ['name' => 'Sesame Oil', 'description' => '1 tablespoon'],
                ],
            ],
            [
                'title' => 'Chocolate Chip Cookies',
                'short_description' => 'Soft and chewy homemade chocolate chip cookies.',
                'prep_time' => 15,
                'cook_time' => 12,
                'directions' => [
                    ['title' => 'Preheat Oven', 'short_description' => 'Preheat oven to 180°C (350°F). Line baking sheets with parchment paper.'],
                    ['title' => 'Mix Dry Ingredients', 'short_description' => 'In a bowl, whisk together flour, baking soda, and salt.'],
                    ['title' => 'Cream Butter & Sugar', 'short_description' => 'Cream butter and sugars until light and fluffy. Add eggs and vanilla.'],
                    ['title' => 'Combine', 'short_description' => 'Gradually add dry ingredients to wet ingredients. Fold in chocolate chips.'],
                    ['title' => 'Bake', 'short_description' => 'Drop tablespoon-sized dough balls onto baking sheets. Bake for 10-12 minutes.'],
                    ['title' => 'Cool', 'short_description' => 'Let cookies cool on baking sheet for 5 minutes before transferring to wire rack.'],
                ],
                'ingredients' => [
                    ['name' => 'Flour', 'description' => '2 ¼ cups all-purpose'],
                    ['name' => 'Butter', 'description' => '1 cup (2 sticks), softened'],
                    ['name' => 'Sugar', 'description' => '¾ cup granulated + ¾ cup brown'],
                    ['name' => 'Eggs', 'description' => '2 large eggs'],
                    ['name' => 'Chocolate Chips', 'description' => '2 cups semi-sweet'],
                    ['name' => 'Vanilla Extract', 'description' => '2 teaspoons'],
                    ['name' => 'Baking Soda', 'description' => '1 teaspoon'],
                    ['name' => 'Salt', 'description' => '½ teaspoon'],
                ],
            ],
        ];

        foreach ($recipes as $recipeData) {
            // Create recipe
            $recipe = Recipe::create([
                'user_id' => $user->id,
                'title' => $recipeData['title'],
                'featured' => $recipeData['featured'] ?? false,
                'short_description' => $recipeData['short_description'],
                'category_id' => $categories->random()->id,
                'prep_time' => $recipeData['prep_time'],
                'cook_time' => $recipeData['cook_time'],
                'image' => 'recipes/' . strtolower(str_replace(' ', '_', $recipeData['title'])) . '.jpg',
            ]);

            // Add directions
            foreach ($recipeData['directions'] as $index => $direction) {
                Direction::create([
                    'recipe_id' => $recipe->id,
                    'title' => $direction['title'],
                    'short_description' => $direction['short_description'],
                ]);
            }

            // Add ingredients with pivot data
            foreach ($recipeData['ingredients'] as $ingredientData) {
                // Find or create the ingredient
                $ingredient = Ingredient::firstOrCreate(
                    ['title' => $ingredientData['name']],
                    ['short_description' => 'Added by seeder']
                );
                
                // Attach with pivot data
                $recipe->ingredients()->attach($ingredient->id, [
                    'title' => $ingredient->title,
                    'description' => $ingredientData['description'] ?? null,
                ]);
            }
        }
    }
}