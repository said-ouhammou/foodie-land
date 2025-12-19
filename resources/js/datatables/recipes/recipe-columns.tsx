import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/types/Recipe';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChefHat, Clock, Edit, Eye } from 'lucide-react';
import { DeleteRecipeButton } from './delete-button';

export const recipeColumns: ColumnDef<Recipe>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className="px-0 hover:bg-transparent"
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="font-mono text-sm">{row.getValue('id')}</div>
        ),
        size: 60,
    },
    {
        accessorKey: 'title',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className="px-0 font-medium hover:bg-transparent"
                >
                    Recipe
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const recipe = row.original;
            return (
                <div className="flex items-center gap-3">
                    {recipe.image ? (
                        <img
                            src={`/storage/${recipe.image}`}
                            alt={'Img'}
                            className="h-10 w-10 rounded-md border object-cover"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-gray-100">
                            <ChefHat className="h-5 w-5 text-gray-400" />
                        </div>
                    )}
                    <div className="min-w-0">
                        <p className="truncate font-medium">{recipe.title}</p>
                        <p className="truncate text-xs text-gray-500">
                            {recipe.short_description}
                        </p>
                    </div>
                </div>
            );
        },
        size: 300,
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => {
            const category = row.getValue('category') as Recipe['category'];
            return category ? (
                <Badge
                    className="font-medium"
                    style={{
                        backgroundColor: `${category.color}20`,
                        color: category.color,
                        borderColor: `${category.color}40`,
                    }}
                >
                    {category.title}
                </Badge>
            ) : (
                '_'
            );
        },
        size: 120,
    },
    {
        accessorKey: 'prep_time',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className="px-0 hover:bg-transparent"
                >
                    <Clock className="mr-2 h-4 w-4" />
                    Prep
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const prepTime = row.getValue('prep_time') as number;
            return (
                <div className="text-center">
                    <span className="font-medium">{prepTime}</span>
                    <span className="ml-1 text-xs text-gray-500">min</span>
                </div>
            );
        },
        size: 80,
    },
    {
        accessorKey: 'cook_time',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className="px-0 hover:bg-transparent"
                >
                    <ChefHat className="mr-2 h-4 w-4" />
                    Cook
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const cookTime = row.getValue('cook_time') as number;
            return (
                <div className="text-center">
                    <span className="font-medium">{cookTime}</span>
                    <span className="ml-1 text-xs text-gray-500">min</span>
                </div>
            );
        },
        size: 80,
    },
    {
        accessorKey: 'total_time',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className="px-0 hover:bg-transparent"
                >
                    Total Time
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const totalTime = row.getValue('total_time') as number;
            return (
                <div className="text-center">
                    <Badge variant="outline" className="font-medium">
                        {totalTime} min
                    </Badge>
                </div>
            );
        },
        size: 100,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className="px-0 hover:bg-transparent"
                >
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('created_at'));
            return (
                <div className="text-sm">
                    {date.toLocaleDateString()}
                    <div className="text-xs text-gray-500">
                        {date.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </div>
                </div>
            );
        },
        size: 120,
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const recipe = row.original;

            return (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="View recipe"
                        className="h-8 w-8"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit recipe"
                        className="h-8 w-8"
                    >
                        <Link href={`/recipes/${recipe.id}/edit`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                    <DeleteRecipeButton recipe={recipe} />
                </div>
            );
        },
        size: 120,
    },
];
