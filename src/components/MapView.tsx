import { useContext, useLayoutEffect, useRef } from 'react';

import { Map } from 'mapbox-gl';

import { PlacesContext, MapContext } from '../context';
import { Loading } from './Loading';

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapId = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapId.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 9,
      });
      setMap(map);
    }
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return <div ref={mapId} className="h-screen w-screen"></div>;
};
