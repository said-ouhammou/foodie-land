import { Button } from '@/components/ui/button';
import { categoryColumns } from '@/datatables/categories/category-columns';
import { CategoryDataTable } from '@/datatables/categories/category-data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Category } from '@/types/Category';
import { Head, Link, usePage } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

type CategoriesPageProps = {
    categories: Category[];
};

export default function CategoriesPage() {
    const { categories } = usePage<CategoriesPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium">Categories List</h1>
                    <Link href={'/categories/create'}>
                        <Button className="cursor-pointer">
                            <PlusCircle className="h-4 w-4" /> New Category
                        </Button>
                    </Link>
                </div>
                <CategoryDataTable
                    columns={categoryColumns}
                    data={categories}
                />
            </div>
        </AppLayout>
    );
}
