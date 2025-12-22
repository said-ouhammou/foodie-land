<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $user = User::first();

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
        
        ];

        foreach ($categories as $category) {
            Category::create([
                'user_id' => $user->id,
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
