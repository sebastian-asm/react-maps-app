import { PlacesState } from './PlacesProvider';

type PlacesAction = { type: 'setUserLocation'; payload: [number, number] };

// reducer recibe un estado y devuelve un objeto del mismo tipo del estado
export const placesReducer = (
  state: PlacesState,
  action: PlacesAction
): PlacesState => {
  switch (action.type) {
    case 'setUserLocation':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };

    default:
      return state;
  }
};
