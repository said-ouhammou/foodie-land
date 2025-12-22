import { Ingredient } from '@/types/Recipe';
import AppContainer from '../app-container';
import IngredientRecord from './ingredient-record';

type IngredientsSectionProps = {
    ingredients?: Ingredient[];
};

export default function IngredientsSection({
    ingredients,
}: IngredientsSectionProps) {
    return (
        <section id="ingredients-details">
            <AppContainer>
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Ingredients
                    </h2>

                    <div className="py-8">
                        {ingredients && ingredients.length
                            ? ingredients.map((ingredient) => (
                                  <IngredientRecord
                                      key={ingredient.id}
                                      ingredient={ingredient}
                                  />
                              ))
                            : ''}
                    </div>
                </div>
            </AppContainer>
        </section>
    );
}
