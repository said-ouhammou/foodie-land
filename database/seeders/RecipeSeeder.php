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

        // Sample recipes with nutritional info
        $recipes = [
            [
                'title' => 'Classic Spaghetti Carbonara',
                'image' => 'recipes/1.png',
                'short_description' => 'A traditional Italian pasta dish with eggs, cheese, and pancetta.',
                'prep_time' => 15,
                'cook_time' => 20,
                'featured' => 1,
                'calories' => 650,
                'total_fats' => 32.5,
                'proteins' => 28.7,
                'carbs' => 58.2,
                'cholesterol' => 210,
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
                'image' => '/recipes/2.png',
                'short_description' => 'Quick and healthy vegetable stir fry with tofu in a savory sauce.',
                'prep_time' => 20,
                'cook_time' => 15,
                'calories' => 320,
                'total_fats' => 14.2,
                'proteins' => 18.5,
                'carbs' => 32.8,
                'cholesterol' => 0,
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
                'image' => 'recipes/3.png',
                'short_description' => 'Soft and chewy homemade chocolate chip cookies.',
                'prep_time' => 15,
                'cook_time' => 12,
                'calories' => 180,
                'total_fats' => 9.5,
                'proteins' => 2.1,
                'carbs' => 23.8,
                'cholesterol' => 25,
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
            [
                'title' => 'Grilled Salmon with Lemon Herb Sauce',
                'image' => 'recipes/4.png',
                'short_description' => 'Healthy grilled salmon fillets with a fresh lemon and herb sauce.',
                'prep_time' => 10,
                'cook_time' => 15,
                'featured' => 1,
                'calories' => 420,
                'total_fats' => 25.5,
                'proteins' => 38.2,
                'carbs' => 3.8,
                'cholesterol' => 95,
                'directions' => [
                    ['title' => 'Prepare Salmon', 'short_description' => 'Pat salmon fillets dry and season with salt and pepper.'],
                    ['title' => 'Make Sauce', 'short_description' => 'Mix olive oil, lemon juice, dill, parsley, and garlic in a bowl.'],
                    ['title' => 'Grill Salmon', 'short_description' => 'Grill salmon for 6-7 minutes per side until flaky.'],
                    ['title' => 'Serve', 'short_description' => 'Drizzle lemon herb sauce over salmon and serve with vegetables.'],
                ],
                'ingredients' => [
                    ['name' => 'Salmon Fillet', 'description' => '4 pieces, 150g each'],
                    ['name' => 'Lemon', 'description' => 'Juice of 1 lemon'],
                    ['name' => 'Olive Oil', 'description' => '3 tablespoons'],
                    ['name' => 'Fresh Dill', 'description' => '2 tablespoons, chopped'],
                    ['name' => 'Garlic', 'description' => '2 cloves, minced'],
                    ['name' => 'Salt and Pepper', 'description' => 'To taste'],
                ],
            ],
            [
                'title' => 'Greek Salad with Feta',
                'image' => 'recipes/5.png',
                'short_description' => 'Fresh Mediterranean salad with crisp vegetables and feta cheese.',
                'prep_time' => 15,
                'cook_time' => 0,
                'calories' => 280,
                'total_fats' => 22.1,
                'proteins' => 8.3,
                'carbs' => 12.4,
                'cholesterol' => 35,
                'directions' => [
                    ['title' => 'Chop Vegetables', 'short_description' => 'Dice cucumbers, tomatoes, and red onion. Slice olives.'],
                    ['title' => 'Prepare Dressing', 'short_description' => 'Whisk olive oil, lemon juice, oregano, salt, and pepper.'],
                    ['title' => 'Combine', 'short_description' => 'Toss vegetables with dressing in a large bowl.'],
                    ['title' => 'Add Cheese', 'short_description' => 'Crumble feta cheese over the salad and gently mix.'],
                    ['title' => 'Serve', 'short_description' => 'Garnish with fresh oregano leaves and serve chilled.'],
                ],
                'ingredients' => [
                    ['name' => 'Cucumber', 'description' => '1 large, diced'],
                    ['name' => 'Tomatoes', 'description' => '3 medium, chopped'],
                    ['name' => 'Red Onion', 'description' => '½ medium, thinly sliced'],
                    ['name' => 'Feta Cheese', 'description' => '200g, crumbled'],
                    ['name' => 'Kalamata Olives', 'description' => '½ cup, pitted'],
                    ['name' => 'Olive Oil', 'description' => '¼ cup'],
                    ['name' => 'Lemon Juice', 'description' => '2 tablespoons'],
                    ['name' => 'Fresh Oregano', 'description' => '1 tablespoon, chopped'],
                ],
            ],
            [
                'title' => 'Chicken Tikka Masala',
                'image' => 'recipes/6.png',
                'short_description' => 'Creamy Indian curry with marinated chicken in a rich tomato sauce.',
                'prep_time' => 30,
                'cook_time' => 40,
                'featured' => 1,
                'calories' => 580,
                'total_fats' => 38.2,
                'proteins' => 42.5,
                'carbs' => 18.7,
                'cholesterol' => 165,
                'directions' => [
                    ['title' => 'Marinate Chicken', 'short_description' => 'Mix yogurt, spices, and lemon juice. Marinate chicken for 1 hour.'],
                    ['title' => 'Cook Chicken', 'short_description' => 'Grill or pan-fry chicken until cooked through.'],
                    ['title' => 'Prepare Sauce', 'short_description' => 'Sauté onions, garlic, ginger, then add tomatoes and spices.'],
                    ['title' => 'Simmer', 'short_description' => 'Add cream and cooked chicken. Simmer for 15 minutes.'],
                    ['title' => 'Garnish', 'short_description' => 'Top with fresh cilantro and serve with rice or naan.'],
                ],
                'ingredients' => [
                    ['name' => 'Chicken Breast', 'description' => '600g, cubed'],
                    ['name' => 'Yogurt', 'description' => '1 cup plain'],
                    ['name' => 'Heavy Cream', 'description' => '1 cup'],
                    ['name' => 'Tomato Puree', 'description' => '400g can'],
                    ['name' => 'Onion', 'description' => '2 medium, finely chopped'],
                    ['name' => 'Ginger Garlic Paste', 'description' => '2 tablespoons'],
                    ['name' => 'Garam Masala', 'description' => '2 teaspoons'],
                    ['name' => 'Turmeric', 'description' => '1 teaspoon'],
                ],
            ],
            [
                'title' => 'Avocado Toast with Poached Eggs',
                'image' => 'recipes/7.png',
                'short_description' => 'Healthy breakfast with creamy avocado and perfectly poached eggs.',
                'prep_time' => 10,
                'cook_time' => 10,
                'calories' => 350,
                'total_fats' => 24.8,
                'proteins' => 16.3,
                'carbs' => 20.5,
                'cholesterol' => 185,
                'directions' => [
                    ['title' => 'Toast Bread', 'short_description' => 'Toast sourdough bread until golden and crispy.'],
                    ['title' => 'Mash Avocado', 'short_description' => 'Mash avocado with lemon juice, salt, and pepper.'],
                    ['title' => 'Poach Eggs', 'short_description' => 'Poach eggs in simmering water with vinegar for 3-4 minutes.'],
                    ['title' => 'Assemble', 'short_description' => 'Spread avocado on toast, top with poached egg.'],
                    ['title' => 'Season', 'short_description' => 'Sprinkle with chili flakes, sea salt, and fresh herbs.'],
                ],
                'ingredients' => [
                    ['name' => 'Sourdough Bread', 'description' => '4 slices'],
                    ['name' => 'Avocado', 'description' => '2 ripe'],
                    ['name' => 'Eggs', 'description' => '4 large'],
                    ['name' => 'Lemon', 'description' => 'Juice of ½ lemon'],
                    ['name' => 'Red Chili Flakes', 'description' => '1 teaspoon'],
                    ['name' => 'Fresh Cilantro', 'description' => 'For garnish'],
                    ['name' => 'White Vinegar', 'description' => '1 tablespoon for poaching'],
                ],
            ],
            [
                'title' => 'Beef Burgers with Caramelized Onions',
                'image' => 'recipes/8.png',
                'short_description' => 'Juicy homemade beef burgers with sweet caramelized onions.',
                'prep_time' => 20,
                'cook_time' => 15,
                'calories' => 720,
                'total_fats' => 45.3,
                'proteins' => 48.7,
                'carbs' => 32.8,
                'cholesterol' => 145,
                'directions' => [
                    ['title' => 'Prepare Patties', 'short_description' => 'Mix ground beef with seasonings and form into patties.'],
                    ['title' => 'Caramelize Onions', 'short_description' => 'Cook sliced onions with butter and sugar until golden brown.'],
                    ['title' => 'Cook Burgers', 'short_description' => 'Grill or pan-fry burgers to desired doneness.'],
                    ['title' => 'Toast Buns', 'short_description' => 'Toast burger buns until lightly crispy.'],
                    ['title' => 'Assemble', 'short_description' => 'Layer lettuce, burger, cheese, onions, and sauce on buns.'],
                ],
                'ingredients' => [
                    ['name' => 'Ground Beef', 'description' => '500g, 80/20 fat ratio'],
                    ['name' => 'Burger Buns', 'description' => '4 brioche buns'],
                    ['name' => 'Onion', 'description' => '2 large, sliced'],
                    ['name' => 'Cheddar Cheese', 'description' => '4 slices'],
                    ['name' => 'Lettuce', 'description' => '4 leaves'],
                    ['name' => 'Tomato', 'description' => '1 large, sliced'],
                    ['name' => 'Burger Sauce', 'description' => '4 tablespoons'],
                ],
            ],
            [
                'title' => 'Mango Smoothie Bowl',
                'image' => 'recipes/9.png',
                'short_description' => 'Tropical smoothie bowl topped with fresh fruits and nuts.',
                'prep_time' => 10,
                'cook_time' => 0,
                'calories' => 320,
                'total_fats' => 12.5,
                'proteins' => 8.7,
                'carbs' => 45.8,
                'cholesterol' => 5,
                'directions' => [
                    ['title' => 'Blend Smoothie', 'short_description' => 'Blend frozen mango, banana, yogurt, and milk until smooth.'],
                    ['title' => 'Prepare Toppings', 'short_description' => 'Slice fresh fruits and prepare nuts/seeds.'],
                    ['title' => 'Assemble Bowl', 'short_description' => 'Pour smoothie into a bowl and arrange toppings.'],
                    ['title' => 'Finish', 'short_description' => 'Drizzle with honey and sprinkle with chia seeds.'],
                ],
                'ingredients' => [
                    ['name' => 'Frozen Mango', 'description' => '2 cups'],
                    ['name' => 'Banana', 'description' => '1 ripe'],
                    ['name' => 'Greek Yogurt', 'description' => '½ cup'],
                    ['name' => 'Almond Milk', 'description' => '½ cup'],
                    ['name' => 'Fresh Berries', 'description' => '½ cup mixed'],
                    ['name' => 'Granola', 'description' => '¼ cup'],
                    ['name' => 'Chia Seeds', 'description' => '1 tablespoon'],
                    ['name' => 'Honey', 'description' => 'For drizzling'],
                ],
            ],
            [
                'title' => 'Vegetable Lasagna',
                'image' => '/recipes/9.png',
                'short_description' => 'Hearty vegetarian lasagna with layers of vegetables and cheese.',
                'prep_time' => 30,
                'cook_time' => 45,
                'calories' => 480,
                'total_fats' => 22.8,
                'proteins' => 24.3,
                'carbs' => 45.7,
                'cholesterol' => 65,
                'directions' => [
                    ['title' => 'Prepare Vegetables', 'short_description' => 'Sauté zucchini, mushrooms, and spinach with garlic.'],
                    ['title' => 'Make Sauce', 'short_description' => 'Prepare tomato sauce or use store-bought marinara.'],
                    ['title' => 'Layer Lasagna', 'short_description' => 'Alternate layers of noodles, vegetables, sauce, and cheese.'],
                    ['title' => 'Bake', 'short_description' => 'Bake covered at 180°C for 30 minutes, then uncovered for 15 minutes.'],
                    ['title' => 'Rest', 'short_description' => 'Let lasagna rest for 10 minutes before slicing.'],
                ],
                'ingredients' => [
                    ['name' => 'Lasagna Noodles', 'description' => '12 sheets, no-boil'],
                    ['name' => 'Ricotta Cheese', 'description' => '500g'],
                    ['name' => 'Mozzarella', 'description' => '300g, shredded'],
                    ['name' => 'Zucchini', 'description' => '2 medium, sliced'],
                    ['name' => 'Mushrooms', 'description' => '200g, sliced'],
                    ['name' => 'Spinach', 'description' => '200g fresh'],
                    ['name' => 'Marinara Sauce', 'description' => '700g jar'],
                    ['name' => 'Parmesan', 'description' => '100g, grated'],
                ],
            ],
           
        ];

        foreach ($recipes as $recipeData) {
            // Create recipe with nutritional info
            $recipe = Recipe::create([
                'user_id' => $user->id,
                'title' => $recipeData['title'],
                'image' => $recipeData['image'],
                'featured' => $recipeData['featured'] ?? false,
                'short_description' => $recipeData['short_description'],
                'category_id' => $categories->random()->id,
                'prep_time' => $recipeData['prep_time'],
                'cook_time' => $recipeData['cook_time'],
                'calories' => $recipeData['calories'] ?? null,
                'total_fats' => $recipeData['total_fats'] ?? null,
                'proteins' => $recipeData['proteins'] ?? null,
                'carbs' => $recipeData['carbs'] ?? null,
                'cholesterol' => $recipeData['cholesterol'] ?? null,
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