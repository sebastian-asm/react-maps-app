import { useContext } from 'react';

import { PlacesContext } from '../context';
import { LoadingSearch } from './LoadingSearch';

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);

  if (isLoadingPlaces) return <LoadingSearch />;
  if (places.length === 0) return null;

  return (
    <div className="w-48 h-screen mt-2">
      <div className="overflow-y-scroll h-4/6 bg-white p-1.5 rounded-lg shadow-md">
        <p className="text-center font-bold text-purple-600 mb-1.5">
          Resultados
        </p>
        <ul>
          {places.map((place) => (
            <li key={place.id} className="py-1.5 border-b last:border-b-0">
              <p className="text-sm text-purple-600 font-bold">{place.text}</p>
              <span className="text-xs text-gray-400">{place.place_name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
