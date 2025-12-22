import AppContainer from '@/components/custom/app-container';
import Footer from '@/components/custom/includes/footer';
import Header from '@/components/custom/includes/header';
import DirectionsSection from '@/components/custom/recipe-details/directions-section';
import IngredientsSection from '@/components/custom/recipe-details/ingredients-section';
import RecipeDescription from '@/components/custom/recipe-details/recipe-description';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/types/Recipe';
import { ForkKnife, Share, Timer } from 'lucide-react';

type RecipeDetailsProps = {
    recipe: Recipe;
};

export default function RecipeDetails({ recipe }: RecipeDetailsProps) {
    return (
        <>
            <Header />
            <section id="recipe-detail-top" className="py-4 md:py-10">
                <AppContainer>
                    <div className="items-center justify-between md:flex">
                        <div>
                            <h1 className="text-3xl tracking-tighter sm:text-5xl">
                                {recipe.title}
                            </h1>
                            <div className="mt-6 flex max-w-xl flex-col md:mt-12">
                                <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:justify-between">
                                    <div id="user-info" className="flex gap-2">
                                        <div>
                                            <img
                                                src="/images/user.png"
                                                alt="user"
                                                className="h-6 w-6 rounded-full object-contain object-center sm:h-8 sm:w-8"
                                            />
                                        </div>
                                        <div className="items-between flex flex-col">
                                            <span className="text-xs font-semibold tracking-tight sm:text-sm">
                                                {recipe.user.name}
                                            </span>
                                            <span className="text-[10px] tracking-tight text-[#00000099] sm:text-xs">
                                                {recipe.created_at}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        id="user-info"
                                        className="border-l-solid flex h-8 items-center gap-2 border-l-2 border-l-gray-400 pl-4"
                                    >
                                        <div>
                                            <Timer className="h-5 w-5" />
                                        </div>
                                        <div className="items-between flex flex-col">
                                            <span className="text-xs font-semibold tracking-tight sm:text-sm">
                                                PERP TIME
                                            </span>
                                            <span className="text-[10px] tracking-tight text-[#00000099] sm:text-xs">
                                                {recipe.prep_time}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        id="user-info"
                                        className="border-l-solid flex h-8 items-center gap-2 border-l-2 border-l-gray-400 pl-4"
                                    >
                                        <div>
                                            <Timer className="h-5 w-5" />
                                        </div>
                                        <div className="items-between flex flex-col">
                                            <span className="text-xs font-semibold tracking-tight sm:text-sm">
                                                COCK TIME
                                            </span>
                                            <span className="text-[10px] tracking-tight text-[#00000099] sm:text-xs">
                                                {recipe.cook_time}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        id="user-info"
                                        className="border-l-solid flex h-8 items-center gap-2 border-l-2 border-l-gray-400 pl-4"
                                    >
                                        <div>
                                            <ForkKnife className="h-5 w-5" />
                                        </div>
                                        <div className="items-between flex flex-col">
                                            <span className="text-[10px] tracking-tight sm:text-sm">
                                                {recipe.category?.title}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end md:mt-0 md:mt-8 md:block">
                            <div className="p-1">
                                <Button className="h-12 w-12 rounded-full bg-[#E7FAFE] text-black">
                                    <Share className="h-6 w-6" />
                                </Button>
                                <p className="mt-4 text-xs text-gray-500">
                                    SHARE
                                </p>
                            </div>
                        </div>
                    </div>
                </AppContainer>
            </section>
            <section className="py-0 md:py-4">
                <AppContainer>
                    <div className="grid gap-8 lg:grid-cols-[2.5fr_1fr]">
                        <div className="overflow-hidden rounded-3xl">
                            <img
                                src={`/Storage/${recipe.image}`}
                                alt={recipe.title}
                                className="max-h-[480px] w-full object-cover object-center"
                            />
                        </div>
                        <div className="rounded-3xl bg-[#E7FAFE] p-8">
                            <h3>Nutrition Information</h3>

                            <div className="flex flex-col">
                                <div>
                                    <div className="border-b-solid mt-3 flex items-center justify-between border-b border-b-gray-200 py-2">
                                        <p className="text-sm text-gray-400">
                                            Calories
                                        </p>
                                        <p className="text-sm font-semibold">
                                            250 Kcal
                                        </p>
                                    </div>

                                    <div className="border-b-solid mt-3 flex items-center justify-between border-b border-b-gray-200 py-2">
                                        <p className="text-sm text-gray-400">
                                            Calories
                                        </p>
                                        <p className="text-sm font-semibold">
                                            250 Kcal
                                        </p>
                                    </div>

                                    <div className="border-b-solid mt-3 flex items-center justify-between border-b border-b-gray-200 py-2">
                                        <p className="text-sm text-gray-400">
                                            Calories
                                        </p>
                                        <p className="text-sm font-semibold">
                                            250 Kcal
                                        </p>
                                    </div>

                                    <div className="border-b-solid mt-3 flex items-center justify-between border-b border-b-gray-200 py-2">
                                        <p className="text-sm text-gray-400">
                                            Calories
                                        </p>
                                        <p className="text-sm font-semibold">
                                            250 Kcal
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="mt-6 text-sm text-gray-600">
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua.{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </AppContainer>
            </section>

            <RecipeDescription description={recipe.short_description} />

            <IngredientsSection ingredients={recipe.ingredients} />
            <DirectionsSection directions={recipe.directions} />
            <Footer />
        </>
    );
}
