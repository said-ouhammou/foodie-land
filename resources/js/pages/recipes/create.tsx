import CreateRecipeForm from '@/forms/recpies/create-recipe-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

type createPageProps = {
    categories: Array<{ id: number; title: string }>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
    {
        title: 'Create',
        href: '/categories/create',
    },
];

export default function CreatePage() {
    const { categories } = usePage<createPageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-medium">Create new Category</h1>

                <CreateRecipeForm categories={categories} />
            </div>
        </AppLayout>
    );
}
