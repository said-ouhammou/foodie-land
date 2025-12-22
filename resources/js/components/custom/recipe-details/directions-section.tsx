import { Direction } from '@/types/Recipe';
import AppContainer from '../app-container';
import DirectionRecord from './direction-record';

type DirectionsSectionProps = {
    directions?: Direction[];
};

export default function DirectionsSection({
    directions,
}: DirectionsSectionProps) {
    return (
        <section id="directions-details">
            <AppContainer>
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Directions
                    </h2>

                    <div className="py-8">
                        {directions && directions.length > 0
                            ? directions.map((direction) => (
                                  <DirectionRecord
                                      key={direction.id}
                                      direction={direction}
                                  />
                              ))
                            : ''}
                    </div>
                </div>
            </AppContainer>
        </section>
    );
}
