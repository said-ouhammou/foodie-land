<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{

    protected $fillable = [
        'title',
        'slug',
        'color',
        'image',
        'is_active',
    ];
}
