<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing categories
        Category::truncate();

        $categories = [
            [
                'title' => 'Breakfast',
                'color' => '#FF6B6B', // Red
                'image' => 'categories/breakfast.jpg',
            ],
            [
                'title' => 'Lunch',
                'color' => '#4ECDC4', // Teal
                'image' => 'categories/lunch.jpg',
            ],
            [
                'title' => 'Dinner',
                'color' => '#45B7D1', // Blue
                'image' => 'categories/dinner.jpg',
            ],
            [
                'title' => 'Desserts',
                'color' => '#96CEB4', // Green
                'image' => 'categories/desserts.jpg',
            ],
            [
                'title' => 'Vegetarian',
                'color' => '#FFEAA7', // Yellow
                'image' => 'categories/vegetarian.jpg',
            ],
            [
                'title' => 'Vegan',
                'color' => '#98D8C8', // Mint
                'image' => 'categories/vegan.jpg',
                'is_active' => false, // Example of inactive category
            ],
            [
                'title' => 'Quick & Easy',
                'color' => '#DDA0DD', // Purple
                'image' => 'categories/quick-easy.jpg',
            ],
            [
                'title' => 'Healthy',
                'color' => '#A8E6CF', // Light Green
                'image' => 'categories/healthy.jpg',
            ],
            [
                'title' => 'Baking',
                'color' => '#F7DC6F', // Gold
                'image' => 'categories/baking.jpg',
            ],
            [
                'title' => 'Snacks',
                'color' => '#FFD3B6', // Peach
                'image' => 'categories/snacks.jpg',
            ],
            [
                'title' => 'Drinks',
                'color' => '#B5EAD7', // Pastel Green
                'image' => 'categories/drinks.jpg',
            ],
            [
                'title' => 'Holiday Special',
                'color' => '#FF9AA2', // Pink
                'image' => 'categories/holiday.jpg',
            ],
            [
                'title' => 'Family Meals',
                'color' => '#C7CEEA', // Lavender
                'image' => 'categories/family-meals.jpg',
            ],
            [
                'title' => 'Budget Friendly',
                'color' => '#E2F0CB', // Light Lime
                'image' => 'categories/budget.jpg',
            ],
            [
                'title' => 'Gluten Free',
                'color' => '#B5EAD7', // Light Teal
                'image' => 'categories/gluten-free.jpg',
            ],
            [
                'title' => 'Low Carb',
                'color' => '#FFDAC1', // Light Orange
                'image' => 'categories/low-carb.jpg',
            ],
            [
                'title' => 'Italian',
                'color' => '#FFB7B2', // Coral
                'image' => 'categories/italian.jpg',
            ],
            [
                'title' => 'Mexican',
                'color' => '#FDCFDF', // Pink
                'image' => 'categories/mexican.jpg',
            ],
            [
                'title' => 'Asian',
                'color' => '#ACE1AF', // Light Green
                'image' => 'categories/asian.jpg',
            ],
            [
                'title' => 'Mediterranean',
                'color' => '#FFD700', // Gold
                'image' => 'categories/mediterranean.jpg',
            ],
            [
                'title' => 'Comfort Food',
                'color' => '#CD5C5C', // Indian Red
                'image' => 'categories/comfort-food.jpg',
            ],
            [
                'title' => 'Seafood',
                'color' => '#87CEEB', // Sky Blue
                'image' => 'categories/seafood.jpg',
            ],
            [
                'title' => 'BBQ & Grilling',
                'color' => '#8B0000', // Dark Red
                'image' => 'categories/bbq.jpg',
            ],
            [
                'title' => 'Salads',
                'color' => '#90EE90', // Light Green
                'image' => 'categories/salads.jpg',
            ],
            [
                'title' => 'Soups',
                'color' => '#FFA07A', // Light Salmon
                'image' => 'categories/soups.jpg',
            ],
            [
                'title' => 'Appetizers',
                'color' => '#DA70D6', // Orchid
                'image' => 'categories/appetizers.jpg',
            ],
            [
                'title' => 'Kid Friendly',
                'color' => '#FFC0CB', // Pink
                'image' => 'categories/kid-friendly.jpg',
            ],
            [
                'title' => 'Meal Prep',
                'color' => '#20B2AA', // Light Sea Green
                'image' => 'categories/meal-prep.jpg',
            ],
            [
                'title' => 'Slow Cooker',
                'color' => '#778899', // Light Slate Gray
                'image' => 'categories/slow-cooker.jpg',
            ],
            [
                'title' => 'One Pot Meals',
                'color' => '#B8860B', // Dark Golden Rod
                'image' => 'categories/one-pot.jpg',
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'title' => $category['title'],
                'slug' => Str::slug($category['title']),
                'color' => $category['color'],
                'image' => $category['image'],
                'is_active' => $category['is_active'] ?? true, // Default to true if not set
            ]);
        }

        // If you want more random categories, you can also use:
        // Category::factory()->count(50)->create();
    }
}
