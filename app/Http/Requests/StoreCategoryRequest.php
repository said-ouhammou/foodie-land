<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        // Convert remove_image to boolean if it exists
        if ($this->has('remove_image')) {
            $this->merge([
                'remove_image' => filter_var($this->remove_image, FILTER_VALIDATE_BOOLEAN)
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $categoryId = $this->route('category') ? $this->route('category')->id : null;

        return [
            'title' => [
                'required',
                'string',
                'max:100',
                'unique:categories,title'
            ],
            'color' => [
                'required',
                'string',
                'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/',
                'max:7'
            ],
            'image' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif,webp,svg',
                'max:5120', // 5MB max
                'dimensions:min_width=100,min_height=100,max_width=2000,max_height=2000'
            ]
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The category title is required.',
            'title.unique' => 'A category with this title already exists.',
            'title.max' => 'The title must not exceed 100 characters.',
            'color.required' => 'The color is required.',
            'color.regex' => 'Please enter a valid hex color code (e.g., #FF5733).',
            'image.image' => 'The uploaded file must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, webp, svg.',
            'image.max' => 'The image must not be larger than 5MB.',
            'image.dimensions' => 'The image dimensions must be between 100x100 and 2000x2000 pixels.',
        ];
    }
}
