import Footer from '@/components/custom/includes/footer';
import Header from '@/components/custom/includes/header';
import CategoriesSection from '@/components/custom/welcome-page/categories-section';
import HeroSection from '@/components/custom/welcome-page/hero-section';
import RecipesSection from '@/components/custom/welcome-page/recipes-section';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { categories, recipes, recipe } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <Header />

            <HeroSection recipe={recipe} />
            <CategoriesSection categories={categories} />
            <RecipesSection recipes={recipes} />
            <Footer />
        </>
    );
}
