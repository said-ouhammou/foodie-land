import { Recipe } from '@/types/Recipe';
import { Link } from '@inertiajs/react';
import { Clock, Utensils } from 'lucide-react';

type RecipeCardProps = {
    recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Link
            href={`/${recipe.id}/details`}
            className="cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-t from-blue-50 to-transparent p-2 md:w-[300px]"
        >
            <div className="overflow-hidden rounded-xl">
                <img
                    src={'/storage/' + recipe.image}
                    alt={recipe.title}
                    className="h-52 w-full object-cover"
                />
            </div>
            <div className="px-4 py-6">
                <h3 className="tracking-thighter mb-4 text-xl font-bold">
                    {recipe.title}
                </h3>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{recipe.total_time} Minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Utensils className="h-4 w-4" />
                        <span>Snack {recipe.category?.title}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
