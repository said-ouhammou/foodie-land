export type Category = {
    id?: string;
    title: string;
    color: string;
    image?: File;
    image_url?: string | null;
    created_at?: string;
    updated_at?: string;
};

export type CategoryTableProps = {
    categories: Category[];
};
