import { Category } from '@/types/Category';
import { Button } from '../../ui/button';
import AppContainer from '../app-container';
import CategoryCard from './category-card';

type CategoriesSectionProps = {
    categories: Category[];
};

export default function CategoriesSection({
    categories,
}: CategoriesSectionProps) {
    return (
        <section id="categories-section" className="py-8">
            <AppContainer>
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <h2 className="text-4xl font-semibold tracking-tighter">
                        Categories
                    </h2>
                    <Button className="bg-[#E7FAFE] text-sm text-black hover:bg-[#E7FAFE]/70">
                        View All Categories
                    </Button>
                </div>
                <div className="flex flex-wrap justify-center gap-2 py-12 sm:justify-start sm:gap-4 md:gap-8">
                    {categories && categories.length > 0 ? (
                        categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                            />
                        ))
                    ) : (
                        <p>No category was found</p>
                    )}
                </div>
            </AppContainer>
        </section>
    );
}
