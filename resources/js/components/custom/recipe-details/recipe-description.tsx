import AppContainer from '../app-container';

export default function RecipeDescription({
    description,
}: {
    description: string;
}) {
    return (
        <section className="py-8">
            <AppContainer>
                <p className="mt-8 max-w-5xl text-gray-600">{description}</p>
            </AppContainer>
        </section>
    );
}
