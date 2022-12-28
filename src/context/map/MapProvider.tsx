import { useContext, useEffect, useReducer } from 'react';

import { Map, Marker, Popup } from 'mapbox-gl';

import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const initialState: MapState = {
  isMapReady: false,
  markers: [],
};

export const MapProvider = ({ children }: Props) => {
  const { places } = useContext(PlacesContext);
  const [state, dispatch] = useReducer(mapReducer, initialState);

  // estar pendiente de los cambios de places
  useEffect(() => {
    // limpiando los marcadores anteriores
    state.markers.forEach((marker) => marker.remove());

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
        <p class="text-sm text-purple-600 font-bold">${place.text}</p>
        <span class="text-xs text-gray-400">${place.place_name}</span>
      `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    dispatch({ type: 'setMarkers', payload: newMarkers });
  }, [places]);

  const setMap = (map: Map) => {
    new Marker({ color: 'red' }).setLngLat(map.getCenter()).addTo(map);

    dispatch({
      type: 'setMap',
      payload: map,
    });
  };

  return (
    <MapContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapContext.Provider>
  );
};
