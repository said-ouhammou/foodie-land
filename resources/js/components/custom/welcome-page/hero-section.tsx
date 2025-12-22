import { Recipe } from '@/types/Recipe';
import { Link } from '@inertiajs/react';
import { CirclePlay, ForkKnife, Timer } from 'lucide-react';
import { Button } from '../../ui/button';
import AppContainer from '../app-container';

type HeroSectionProps = {
    recipe: Recipe;
};

export default function HeroSection({ recipe }: HeroSectionProps) {
    return (
        <section id="hero-section" className="py-6">
            <AppContainer>
                {recipe ? (
                    <div className="relative grid min-h-[500px] lg:grid-cols-2">
                        <div
                            id="left-section"
                            className="d-flex order-2 items-center rounded-b-4xl bg-[#E7FAFE] p-6 sm:p-12 lg:order-1 lg:rounded-s-4xl lg:rounded-br-none"
                        >
                            <div
                                id="hero-content"
                                className="flex flex-col gap-4 sm:gap-6"
                            >
                                <div className="flex h-[45px] w-[156px] items-center gap-2 rounded-full bg-white p-4 shadow-xl">
                                    <img
                                        src={`/storage/${recipe?.category?.image}`}
                                        alt={recipe.title}
                                        className="w-5"
                                    />
                                    <span className="text-[14px] font-semibold tracking-tight">
                                        {recipe?.category?.title}
                                    </span>
                                </div>
                                <h1 className="text-4xl font-semibold tracking-[-2px] sm:text-6xl sm:tracking-[-4px]">
                                    {recipe.title}
                                </h1>
                                <p className="sm:text-md text-sm text-[#00000099]">
                                    {recipe.short_description}
                                </p>

                                <div className="flex items-center gap-2">
                                    <div className="flex h-[40px] w-[139px] items-center gap-2 rounded-full bg-slate-100 p-4">
                                        <Timer className="h-5 w-5" />
                                        <span className="text-[14px] tracking-tight">
                                            {recipe.prep_time} Minute
                                        </span>
                                    </div>

                                    <div className="flex h-[40px] w-[139px] items-center gap-2 rounded-full bg-slate-100 p-4">
                                        <ForkKnife className="h-5 w-5" />
                                        <span className="text-[14px] tracking-tight">
                                            {recipe.cook_time} Minute
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                id="hero-footer"
                                className="mt-6 flex flex-col justify-between gap-4 sm:mt-8 sm:flex-row sm:items-center"
                            >
                                <div id="user-info" className="flex gap-2">
                                    <div>
                                        <img
                                            src="/images/user.png"
                                            alt="user"
                                            className="h-8 w-8 rounded-full object-contain object-center"
                                        />
                                    </div>
                                    <div className="items-between flex flex-col">
                                        <span className="text-sm font-semibold tracking-tight">
                                            {recipe.user.name}
                                        </span>
                                        <span className="text-xs tracking-tight text-[#00000099]">
                                            {recipe.created_at}
                                        </span>
                                    </div>
                                </div>

                                <Link href={`/${recipe.id}/details`}>
                                    <Button className="h-[45px] w-full cursor-pointer rounded-xl bg-black text-xs hover:bg-black/70 sm:w-[150px]">
                                        View Recipes
                                        <CirclePlay className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div
                            id="right-section "
                            className="order-1 rounded-tl-4xl rounded-tr-4xl lg:order-2"
                        >
                            <img
                                src={`/storage/${recipe.image}`}
                                alt={recipe.title}
                                className="h-full max-h-[500px] w-full rounded-t-4xl rounded-tr-4xl object-cover object-right lg:rounded-tl-none lg:rounded-r-4xl"
                            />
                        </div>
                    </div>
                ) : (
                    <p>No recipe was fould</p>
                )}
            </AppContainer>
        </section>
    );
}
