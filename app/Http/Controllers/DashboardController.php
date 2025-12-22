<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Recipe;
use App\Models\Category;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() {
        return Inertia::render('dashboard' , [
            'categories_count' => Category::count(),
            'recipes_count' => Recipe::count()
        ]);
    }
}
