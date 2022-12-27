import { createContext } from 'react';

interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
}

// el contexto es lo que se muestra o expone a los demas componentes
export const PlacesContext = createContext<PlacesContextProps>(
  {} as PlacesContextProps
);
