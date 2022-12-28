import { createContext } from 'react';

import { Feature } from '../../interfaces/places';

interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
  searchPlacesByQuery: (query: string) => Promise<Feature[]>;
}

// el contexto es lo que se muestra o expone a los demas componentes
export const PlacesContext = createContext<PlacesContextProps>(
  {} as PlacesContextProps
);
