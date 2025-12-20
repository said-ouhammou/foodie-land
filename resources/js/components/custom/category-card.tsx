import { Category } from '@/types/Category';
import { Link } from '@inertiajs/react';

export default function CategoryCard({ category }: { category: Category }) {
    return (
        <Link
            href={'#'}
            className="flex min-w-[140px] cursor-pointer flex-col items-center justify-center gap-4 rounded-4xl pb-8"
            style={{
                background: `linear-gradient(to top, ${category.color}, ${category.color}10)`,
            }}
        >
            <img
                src="/images/cat-1.png"
                alt="br"
                className="h-24 w-24 object-contain object-center"
            />
            <h3 className="text-md font-semibold tracking-tight">
                {category.title}
            </h3>
        </Link>
    );
}
