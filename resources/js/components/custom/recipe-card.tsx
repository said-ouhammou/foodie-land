import { Clock, Utensils } from 'lucide-react';

export default function RecipeCard() {
    return (
        <div className="cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-t from-blue-50 to-transparent p-2 md:w-[300px]">
            <div className="overflow-hidden rounded-xl">
                <img
                    src="/images/r-1.png"
                    alt="Big and Juicy Wagyu Beef Cheeseburger"
                    className="h-52 w-full object-cover"
                />
            </div>
            <div className="px-4 py-6">
                <h3 className="tracking-thighter mb-4 text-xl font-bold">
                    Big and Juicy Wagyu Beef Cheeseburger
                </h3>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>30 Minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Utensils className="h-4 w-4" />
                        <span>Snack</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
