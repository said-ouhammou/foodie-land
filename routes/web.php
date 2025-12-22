<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\CategoryController;

// Route::get('/', function () {
//     return Inertia::render('site/welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');


    Route::get('/', [WelcomeController::class,"index"])->name('home');
    Route::get('/{recipe}/details', [WelcomeController::class,"show"]);


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('categories', CategoryController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
    Route::resource('recipes', RecipeController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
});

require __DIR__.'/settings.php';
