import { useContext, useEffect, useReducer } from 'react';

import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';

import { directionsApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';
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
        <span class="text-xs text-gray-600">${place.place_name}</span>
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

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(',')};${end.join(',')}`
    );

    const { geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;
    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    // mostrar ambos puntos en el mapa
    state.map?.fitBounds(bounds, {
      padding: 100,
    });

    // polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    // haciendo 'limpieza' antes de volver a marca 'Cómo llegar'
    if (state.map?.getLayer('Routes')) {
      state.map.removeLayer('Routes');
      state.map.removeSource('Routes');
    }

    // 'Routes' es un id aleatorio
    state.map?.addSource('Routes', sourceData);
    state.map?.addLayer({
      id: 'Routes',
      type: 'line',
      source: 'Routes',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'purple',
        'line-width': 3,
      },
    });

    // obteniendo los kms y minutos de distancia entre un punto y otro
    // const { distance, duration } = resp.data.routes[0];
    // const minutes = Math.floor(duration / 60);
    // let kms = distance / 1000;
    // kms = Math.round(kms * 100);
    // kms /= 100;
  };

  return (
    <MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>
      {children}
    </MapContext.Provider>
  );
};
