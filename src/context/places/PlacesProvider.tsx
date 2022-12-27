import { useEffect, useReducer } from 'react';

import { getUserLocation } from '../../helpers';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

const initialState: PlacesState = {
  isLoading: true,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

// estado de nuestro contexto almacenado en memoria
export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, initialState);

  useEffect(() => {
    getUserLocation().then((coords) =>
      dispatch({ type: 'setUserLocation', payload: coords })
    );
  }, []);

  return (
    <PlacesContext.Provider value={{ ...state }}>
      {children}
    </PlacesContext.Provider>
  );
};
