import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Cookie, ForkKnife, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type DashboardProps = {
    categories_count: number;
    recipes_count: number;
};

export default function Dashboard() {
    const { categories_count, recipes_count } = usePage<DashboardProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Stats Cards Grid */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    {/* Categories Card */}
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-sidebar-border dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Categories
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {categories_count}
                                </p>
                                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <ForkKnife className="mr-2 h-4 w-4" />
                                    <span>Recipe categories</span>
                                </div>
                            </div>
                            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                                <ForkKnife className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    {/* Recipes Card */}
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-sidebar-border dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Recipes
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {recipes_count}
                                </p>
                                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <Cookie className="mr-2 h-4 w-4" />
                                    <span>Culinary creations</span>
                                </div>
                            </div>
                            <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                                <Cookie className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Quick Actions Card */}
                <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-sidebar-border dark:bg-gray-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Quick Actions
                            </p>
                            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                Add New
                            </p>
                            <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Plus className="mr-2 h-4 w-4" />
                                <span>Create content</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-amber-100 p-3 dark:bg-amber-900/30">
                            <Plus className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                    </div>
                    <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
                        <div className="grid grid-cols-2 gap-2">
                            <a
                                href="/recipes/create"
                                className="rounded-lg bg-blue-50 px-3 py-2 text-center text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                            >
                                New Recipe
                            </a>
                            <a
                                href="/categories/create"
                                className="rounded-lg bg-gray-100 px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                            >
                                New Category
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
