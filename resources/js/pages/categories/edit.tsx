import EditCategoryForm from '@/forms/categories/edit-category-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Category } from '@/types/Category';
import { Head, usePage } from '@inertiajs/react';

type EditPageProps = {
    category: Category;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
    {
        title: 'Edit',
        href: '/categories/edit',
    },
];

export default function EditPage() {
    const { category } = usePage<EditPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-medium">Edit Category</h1>

                <EditCategoryForm category={category} />
            </div>
        </AppLayout>
    );
}
