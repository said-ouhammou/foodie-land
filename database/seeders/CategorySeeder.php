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
                'image' => '/categories/breakfast.png',
                'color' => '#FF6B6B', // Red
            ],
            [
                'title' => 'Vegan',
                'image' => '/categories/vegan.png',
                'color' => '#4ECDC4', // Teal
            ],
            [
                'title' => 'Meat',
                'image' => '/categories/meat.png',
                'color' => '#45B7D1', // Blue
            ],
            [
                'title' => 'Dessert',
                'color' => '#96CEB4', // Green
                'image' => 'categories/desert.png',
            ],
            [
                'title' => 'Lunch',
                'color' => '#FFEAA7', // Yellow
                'image' => 'categories/lunch.png',
            ],
            [
                'title' => 'Chocolate',
                'color' => '#98D8C8', // Mint
                'image' => 'categories/chocolate.png',
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
