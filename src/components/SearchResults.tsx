import { useContext, useState } from 'react';

import { MapContext, PlacesContext } from '../context';
import { Feature } from '../interfaces/places';
import { LoadingSearch } from './LoadingSearch';

export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);
  const [activePlace, setActivePlace] = useState('');

  if (isLoadingPlaces) return <LoadingSearch />;
  if (places.length === 0) return null;

  const onPlaceClicked = (place: Feature) => {
    setActivePlace(place.id);
    const [lng, lat] = place.center;

    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  const getRoute = (place: Feature) => {
    if (!userLocation) return;
    const [lng, lat] = place.center;
    getRouteBetweenPoints(userLocation, [lng, lat]);
  };

  return (
    <div className="w-48 h-screen mt-2">
      <div className="overflow-y-scroll h-3/4 bg-white p-1.5 rounded-lg shadow-md">
        <p className="text-center font-bold text-purple-600 mb-1.5">
          Resultados
        </p>
        <ul>
          {places.map((place) => (
            <li
              onClick={() => onPlaceClicked(place)}
              key={place.id}
              className={`${
                activePlace === place.id ? 'bg-purple-50' : ''
              } py-2 px-1 border-b-2 last:border-b-0 cursor-pointer hover:bg-purple-50 transition duration-300`}
            >
              <p className="text-sm text-purple-600 font-bold">{place.text}</p>
              <span className="text-xs text-gray-600">{place.place_name}</span>
              <button
                onClick={() => getRoute(place)}
                className="block text-xs text-gray-600 py-1.5 px-2 mt-2 rounded-md border hover:bg-purple-200 hover:border-purple-200 transition duration-300"
              >
                Cómo llegar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
