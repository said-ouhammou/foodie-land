<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Recipe;
use App\Models\Category;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index() {
        $categories = Category::latest()->get();
        $recipes = Recipe::with("category:id,title")->latest()->get();
        $recipe = Recipe::with(["category:id,title,image","user:id,name"])->where('featured',true)->first();

        return Inertia::render("site/welcome", [
            'categories' => $categories,
            'recipes' => $recipes,
            'recipe' => $recipe,
        ]);

    }


    public function show(Recipe $recipe) {
    $recipe->load("category:id,title");
    $recipe->load(['directions', 'ingredients',"user:id,name"]);
    
    return Inertia::render("site/recipe-details", [
        'recipe' => $recipe ,
    ]);
}
}
