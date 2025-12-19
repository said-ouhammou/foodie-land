import EditRecipeForm from '@/forms/recpies/edit-recipe-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Recipe } from '@/types/Recipe';
import { Head, usePage } from '@inertiajs/react';

type createPageProps = {
    categories: Array<{ id: number; title: string }>;
    recipe: Recipe;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Recipes',
        href: '/recipes',
    },
    {
        title: 'Edit',
        href: '/recipes/create',
    },
];

export default function EditPage() {
    const { categories, recipe } = usePage<createPageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recipes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-medium">Create Category</h1>

                <EditRecipeForm categories={categories} recipe={recipe} />
            </div>
        </AppLayout>
    );
}
