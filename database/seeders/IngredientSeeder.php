<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ingredients = [
            // Vegetables
            ['title' => 'Onion', 'short_description' => 'Yellow onion, finely chopped'],
            ['title' => 'Garlic', 'short_description' => 'Fresh garlic cloves, minced'],
            ['title' => 'Tomato', 'short_description' => 'Ripe tomatoes, diced'],
            ['title' => 'Bell Pepper', 'short_description' => 'Red bell pepper, sliced'],
            ['title' => 'Carrot', 'short_description' => 'Fresh carrots, peeled and sliced'],
            ['title' => 'Potato', 'short_description' => 'Russet potatoes, peeled and cubed'],
            ['title' => 'Spinach', 'short_description' => 'Fresh spinach leaves'],
            ['title' => 'Broccoli', 'short_description' => 'Fresh broccoli florets'],
            ['title' => 'Mushroom', 'short_description' => 'White button mushrooms, sliced'],
            
            // Herbs & Spices
            ['title' => 'Salt', 'short_description' => 'Sea salt or table salt'],
            ['title' => 'Black Pepper', 'short_description' => 'Freshly ground black pepper'],
            ['title' => 'Basil', 'short_description' => 'Fresh basil leaves, chopped'],
            ['title' => 'Parsley', 'short_description' => 'Fresh parsley, chopped'],
            ['title' => 'Oregano', 'short_description' => 'Dried oregano'],
            ['title' => 'Cumin', 'short_description' => 'Ground cumin'],
            ['title' => 'Paprika', 'short_description' => 'Sweet paprika powder'],
            ['title' => 'Cinnamon', 'short_description' => 'Ground cinnamon'],
            
            // Dairy
            ['title' => 'Milk', 'short_description' => 'Whole milk'],
            ['title' => 'Butter', 'short_description' => 'Unsalted butter'],
            ['title' => 'Cheese', 'short_description' => 'Grated Parmesan cheese'],
            ['title' => 'Cream', 'short_description' => 'Heavy cream'],
            ['title' => 'Yogurt', 'short_description' => 'Plain Greek yogurt'],
            
            // Proteins
            ['title' => 'Chicken Breast', 'short_description' => 'Boneless, skinless chicken breast'],
            ['title' => 'Ground Beef', 'short_description' => 'Lean ground beef'],
            ['title' => 'Eggs', 'short_description' => 'Large eggs'],
            ['title' => 'Salmon', 'short_description' => 'Fresh salmon fillet'],
            ['title' => 'Tofu', 'short_description' => 'Firm tofu, pressed and cubed'],
            
            // Pantry Staples
            ['title' => 'Olive Oil', 'short_description' => 'Extra virgin olive oil'],
            ['title' => 'Flour', 'short_description' => 'All-purpose flour'],
            ['title' => 'Sugar', 'short_description' => 'Granulated white sugar'],
            ['title' => 'Rice', 'short_description' => 'Long-grain white rice'],
            ['title' => 'Pasta', 'short_description' => 'Spaghetti or pasta of choice'],
            ['title' => 'Bread', 'short_description' => 'Fresh bread slices'],
            ['title' => 'Honey', 'short_description' => 'Pure honey'],
            ['title' => 'Vinegar', 'short_description' => 'Apple cider vinegar'],
            
            // Fruits
            ['title' => 'Lemon', 'short_description' => 'Fresh lemon, juiced'],
            ['title' => 'Apple', 'short_description' => 'Fresh apple, peeled and sliced'],
            ['title' => 'Banana', 'short_description' => 'Ripe banana, mashed'],
            ['title' => 'Strawberry', 'short_description' => 'Fresh strawberries, hulled and sliced'],
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::create($ingredient);
        }
    }
}
