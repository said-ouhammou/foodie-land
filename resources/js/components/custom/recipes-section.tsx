import AppContainer from './app-container';
import RecipeCard from './recipe-card';

export default function RecipesSection() {
    return (
        <section id="recipes-section">
            <AppContainer>
                <div className="flex flex-col items-center justify-center gap-4">
                    <h2 className="text-4xl font-semibold tracking-tighter">
                        Simple and tasty recipes
                    </h2>
                    <p className="max-w-2xl text-center text-sm">
                        Lorem ipsum dolor sit amet, consectetuipisicing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqut enim ad minim
                    </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-4 py-12 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4">
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                </div>
            </AppContainer>
        </section>
    );
}
