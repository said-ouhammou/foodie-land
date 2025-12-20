import { Category } from '@/types/Category';
import { Button } from '../ui/button';
import AppContainer from './app-container';
import CategoryCard from './category-card';

const categories: Category[] = [
    {
        id: '1',
        title: 'Breakfast',
        color: '#FFB347', // Orange
        image_url: '/images/breakfast.jpg',
    },
    {
        id: '2',
        title: 'Italian',
        color: '#FF6F61', // Coral
        image_url: '/images/italian.jpg',
    },
    {
        id: '3',
        title: 'Asian',
        color: '#88B04B', // Green
        image_url: '/images/asian.jpg',
    },
    {
        id: '4',
        title: 'Mexican',
        color: '#EFC050', // Yellow
        image_url: '/images/mexican.jpg',
    },
    {
        id: '5',
        title: 'Seafood',
        color: '#45B8AC', // Teal
        image_url: '/images/seafood.jpg',
    },
    {
        id: '6',
        title: 'Salads',
        color: '#9BB7D4', // Light Blue
        image_url: '/images/salads.jpg',
    },
    {
        id: '7',
        title: 'Soups',
        color: '#E15D44', // Red-Orange
        image_url: '/images/soups.jpg',
    },
];

export default function CategoriesSection() {
    return (
        <section id="categories-section" className="py-8">
            <AppContainer>
                <div className="flex items-center justify-between">
                    <h2 className="text-4xl font-semibold tracking-tighter">
                        Categories
                    </h2>
                    <Button className="bg-[#E7FAFE] text-sm text-black">
                        View All Categories
                    </Button>
                </div>
                <div className="flex gap-8 overflow-auto py-12">
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
