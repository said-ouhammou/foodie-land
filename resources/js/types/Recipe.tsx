import { Category } from './Category';

export type Recipe = {
    id?: number;
    title: string;
    slug: string;
    short_description: string;
    image: string | null;
    image_url?: string;
    category_id: number;
    prep_time: number;
    cook_time: number;
    total_time: number;
    created_at: string;

    // Nutritional information
    calories?: number | null;
    total_fats?: number | null;
    proteins?: number | null;
    carbs?: number | null;
    cholesterol?: number | null;

    category?: Category;
    directions?: Direction[];
    ingredients?: Ingredient[];
    ingredient_recipes?: IngredientRecipe[];
    user: User;
};

export interface RecipeCard {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    image_url: string | null;
    category: {
        id: number;
        title: string;
        color: string;
    };
    prep_time: number;
    cook_time: number;
    total_time: number;
    created_at: string;

    // Optional nutritional information for cards
    calories?: number | null;
    total_fats?: number | null;
    proteins?: number | null;
    carbs?: number | null;
    cholesterol?: number | null;
}

export type Direction = {
    id?: number;
    recipe_id: number;
    title: string | null;
    short_description: string;
    image: string | null;
    image_url?: string;
};

export type Ingredient = {
    id?: number;
    title: string;
    short_description: string | null;
};

export type IngredientRecipe = {
    id?: number;
    recipe_id: number;
    ingredient_id: number;
    title: string | null;
    description: string | null;
};

export type User = {
    id?: string;
    name: string;
};
