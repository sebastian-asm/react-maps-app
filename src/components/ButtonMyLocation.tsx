import { useContext } from 'react';

import { MapContext, PlacesContext } from '../context';

export const ButtonMyLocation = () => {
  const { map } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const onClick = () => {
    if (!map || !userLocation) {
      throw new Error(
        'El mapa no está listo o la ubicación del usuario no está disponible'
      );
    }

    map.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  return (
    <div className="fixed top-3 left-2">
      <button
        onClick={onClick}
        className="flex justify-center items-center bg-purple-600 text-white p-2 w-48 shadow-md rounded-lg hover:bg-purple-500 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current inline mr-2"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="8" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="2" y1="12" x2="4" y2="12" />
        </svg>
        <span>Mi ubicación</span>
      </button>
    </div>
  );
};
