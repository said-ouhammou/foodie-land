<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRecipeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $recipeId = $this->route('recipe')->id;

        return [
            'title' => [
                'required',
                'string',
                'max:100',
                Rule::unique('recipes', 'title')->ignore($recipeId)
            ],
            'short_description' => 'required|string|max:500',
            'category_id' => 'required|exists:categories,id',
            'prep_time' => 'required|integer|min:0',
            'cook_time' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'remove_image' => 'nullable|boolean',
            'ingredients' => 'required|array|min:1',
            // 'ingredients.*.id' => 'nullable|integer|exists:ingredients,id',
            'ingredients.*.title' => 'required|string|max:100',
            'ingredients.*.short_description' => 'nullable|string|max:255',
            'directions' => 'required|array|min:1',
            // 'directions.*.id' => 'nullable|integer|exists:directions,recipe_id',
            'directions.*.title' => 'nullable|string|max:100',
            'directions.*.short_description' => 'required|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The recipe title is required.',
            'title.unique' => 'A recipe with this title already exists.',
            'title.max' => 'The title must not exceed 100 characters.',
            'short_description.required' => 'The description is required.',
            'short_description.max' => 'The description must not exceed 500 characters.',
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'The selected category is invalid.',
            'prep_time.required' => 'Preparation time is required.',
            'prep_time.integer' => 'Preparation time must be a number.',
            'prep_time.min' => 'Preparation time cannot be negative.',
            'cook_time.required' => 'Cooking time is required.',
            'cook_time.integer' => 'Cooking time must be a number.',
            'cook_time.min' => 'Cooking time cannot be negative.',
            'image.image' => 'The uploaded file must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg, webp.',
            'image.max' => 'The image must not be larger than 5MB.',
            'ingredients.required' => 'At least one ingredient is required.',
            'ingredients.*.title.required' => 'Ingredient name is required.',
            'ingredients.*.title.max' => 'Ingredient name must not exceed 100 characters.',
            'ingredients.*.short_description.max' => 'Ingredient notes must not exceed 255 characters.',
            'directions.required' => 'At least one direction step is required.',
            'directions.*.title.max' => 'Step title must not exceed 100 characters.',
            'directions.*.short_description.required' => 'Step instructions are required.',
            'directions.*.short_description.max' => 'Step instructions must not exceed 500 characters.',
        ];
    }

    protected function prepareForValidation()
    {
        // Decode JSON arrays if they come as strings
        if ($this->has('ingredients') && is_string($this->ingredients)) {
            $this->merge([
                'ingredients' => json_decode($this->ingredients, true),
            ]);
        }

        if ($this->has('directions') && is_string($this->directions)) {
            $this->merge([
                'directions' => json_decode($this->directions, true),
            ]);
        }

        // Convert remove_image to boolean
        if ($this->has('remove_image')) {
            $this->merge([
                'remove_image' => filter_var($this->remove_image, FILTER_VALIDATE_BOOLEAN)
            ]);
        }
    }
}
