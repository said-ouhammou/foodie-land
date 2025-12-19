import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/Category';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Eye } from 'lucide-react';
import { DeleteCategoryButton } from './delete-button';

export const categoryColumns: ColumnDef<Category>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue('id')}</div>
        ),
    },
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const image = row.getValue('image') as string;
            const category = row.original;

            return (
                <div className="flex items-center">
                    {image ? (
                        <div className="group relative">
                            <img
                                src={`/storage/${image}`}
                                alt={category.title}
                                className="h-12 w-12 rounded-md border object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
                                    onClick={() => {
                                        window.open(
                                            `/storage/${image}`,
                                            '_blank',
                                        );
                                    }}
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-gray-100">
                            <span className="text-xs text-gray-400">
                                No Image
                            </span>
                        </div>
                    )}
                </div>
            );
        },
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
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const category = row.original;
            return (
                <div className="flex items-center gap-3">
                    <div
                        className="h-4 w-4 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.title}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'color',
        header: 'Color',
        cell: ({ row }) => {
            const color = row.getValue('color') as string;
            return (
                <div className="flex items-center gap-2">
                    <div
                        className="h-6 w-6 rounded border"
                        style={{ backgroundColor: color }}
                    />
                    <Badge variant="outline" className="font-mono">
                        {color}
                    </Badge>
                </div>
            );
        },
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
    },
    {
        accessorKey: 'updated_at',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Updated
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('updated_at'));
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
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const category = row.original;

            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit category"
                    >
                        <Link href={`/categories/${category.id}/edit`}>
                            {' '}
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                    <DeleteCategoryButton category={category} />
                </div>
            );
        },
    },
];
