import { Ingredient } from '@/types/Recipe';

export default function IngredientRecord({
    ingredient,
}: {
    ingredient: Ingredient;
}) {
    return (
        <div className="w-full max-w-5xl">
            <div className="flex items-center gap-4 border-b border-b-gray-200 py-4">
                <input
                    type="checkbox"
                    id={`ing-${ingredient.id}`}
                    className="peer hidden"
                />
                <label
                    htmlFor={`ing-${ingredient.id}`}
                    className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border-2 border-gray-300 bg-white peer-checked:border-black peer-checked:bg-black"
                >
                    <svg
                        className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </label>
                <label
                    htmlFor={`ing-${ingredient.id}`}
                    className="text-md cursor-pointer font-bold peer-checked:text-gray-400 peer-checked:line-through"
                >
                    {ingredient.title}
                </label>
            </div>
        </div>
    );
}
