import { MapProvider, PlacesProvider } from './context';
import { Home } from './pages';

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <Home />
      </MapProvider>
    </PlacesProvider>
  );
};
