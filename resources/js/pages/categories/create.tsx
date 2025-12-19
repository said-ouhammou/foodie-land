import CreateCategoryForm from '@/forms/categories/create-category-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-medium">Create new Category</h1>

                <CreateCategoryForm />
            </div>
        </AppLayout>
    );
}
