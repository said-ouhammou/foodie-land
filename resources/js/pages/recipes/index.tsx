import { Button } from '@/components/ui/button';
import { recipeColumns } from '@/datatables/recipes/recipe-columns';
import { RecipeDataTable } from '@/datatables/recipes/recipe-data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Recipe } from '@/types/Recipe';
import { Head, Link, usePage } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Recipes',
        href: '/recipes',
    },
];

type RecipesPageProps = {
    recipes: Recipe[];
};

export default function RecipesPage() {
    const { recipes } = usePage<RecipesPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recipes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium">Recipes List</h1>
                    <Link href={'/recipes/create'}>
                        <Button className="cursor-pointer">
                            <PlusCircle className="h-4 w-4" /> New Recipe
                        </Button>
                    </Link>
                </div>
                <RecipeDataTable columns={recipeColumns} data={recipes} />
            </div>
        </AppLayout>
    );
}
