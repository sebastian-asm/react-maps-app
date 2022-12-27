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
    <div className="fixed top-2 left-2">
      <button
        onClick={onClick}
        className="bg-purple-600 text-white p-2.5 rounded-lg hover:bg-purple-500 transition duration-300"
      >
        Mi ubicación
      </button>
    </div>
  );
};
