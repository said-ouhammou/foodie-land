<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->nullable();
            $table->text('short_description');
            $table->string('image')->nullable();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->integer('prep_time')->default(0)->comment('Preparation time in minutes');
            $table->integer('cook_time')->default(0)->comment('Cooking time in minutes');
            $table->integer('total_time')->virtualAs('prep_time + cook_time');
            $table->integer('calories')->nullable();
            $table->decimal('total_fats', 8, 2)->nullable(); // grams
            $table->decimal('proteins', 8, 2)->nullable(); // grams
            $table->decimal('carbs', 8, 2)->nullable(); // grams
            $table->integer('cholesterol')->nullable(); // milligrams
            $table->boolean('featured')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
