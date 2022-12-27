import { useReducer } from 'react';

import { Map, Marker, Popup } from 'mapbox-gl';

import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const initialState: MapState = {
  isMapReady: false,
};

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  const setMap = (map: Map) => {
    const popup = new Popup().setHTML(`<p>Mensaje...</p>`);

    new Marker({ color: 'red' })
      .setLngLat(map.getCenter())
      .setPopup(popup)
      .addTo(map);

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
