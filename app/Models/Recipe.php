<?php

namespace App\Models;

use App\Models\User;
use App\Models\Category;
use App\Models\Direction;
use App\Models\Ingredient;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recipe extends Model
{
    /** @use HasFactory<\Database\Factories\RecipeFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'short_description',
        'image',
        'category_id',
        'prep_time',
        'cook_time',
        'calories',
        'total_fats',
        'proteins',
        'carbs',
        'cholesterol',
        'featured',
    ];

    protected $casts = [
        'prep_time' => 'integer',
        'cook_time' => 'integer',
    ];

    /**
     * Get the category that owns the recipe
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the directions for the recipe
     */
    public function directions()
    {
        return $this->hasMany(Direction::class);
    }

    /**
     * Get the ingredients for the recipe
     */
    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'ingredient_recipes')
            ->withPivot('title', 'description')
            ->withTimestamps();
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    /**
     * Get total time (prep + cook)
     */
    public function getTotalTimeAttribute(): int
    {
        return $this->prep_time + $this->cook_time;
    }

    public function getCreatedAtAttribute($value)
    {
        return $value ? \Carbon\Carbon::parse($value)->diffForHumans() : null;
    }
}
