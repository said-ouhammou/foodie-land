import AppLogoIcon from '@/components/app-logo-icon';
import CategoriesSection from '@/components/custom/categories-section';
import Header from '@/components/custom/header';
import HeroSection from '@/components/custom/hero-section';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

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
            <HeroSection />
            <CategoriesSection />
            <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                <main className="flex flex-col items-center">
                    <AppLogoIcon className="mb-4 h-24" />
                    <h1 className="font-medium">Foodie Land V 0.1</h1>
                </main>
            </div>
            <div className="hidden h-14.5 lg:block"></div>
        </>
    );
}
