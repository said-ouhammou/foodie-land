<?php

namespace App\Models;

use App\Models\Recipe;
use Illuminate\Database\Eloquent\Model;

class Direction extends Model
{
    protected $fillable = [
        'recipe_id',
        'title',
        'short_description',
        'image',
    ];

    /**
     * Get the recipe that owns the direction
     */
    public function recipe(): BelongsTo
    {
        return $this->belongsTo(Recipe::class);
    }
}
