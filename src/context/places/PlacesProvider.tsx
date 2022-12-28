import { useEffect, useReducer } from 'react';

import { getUserLocation } from '../../helpers';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';
import { Feature, PlacesResponse } from '../../interfaces/places';
import { searchApi } from '../../apis';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const initialState: PlacesState = {
  isLoading: true,
  isLoadingPlaces: false,
  places: [],
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

  const searchPlacesByQuery = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: 'setPlaces', payload: [] });
      return [];
    }

    if (!state.userLocation) {
      throw new Error('La ubicación del usuario no está disponible');
    }

    dispatch({ type: 'setLoadingPlaces' });

    const { data } = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(','),
      },
    });

    dispatch({ type: 'setPlaces', payload: data.features });
    return data.features;
  };

  return (
    <PlacesContext.Provider value={{ ...state, searchPlacesByQuery }}>
      {children}
    </PlacesContext.Provider>
  );
};
