import React from 'react';
import ReactDOM from 'react-dom/client';

import mapboxgl from 'mapbox-gl';

import { MapsApp } from './MapsApp';
import './index.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

if (!navigator.geolocation) {
  const msg = 'Tu navegador no soporta la Geolocalización';
  alert(msg);
  throw new Error(msg);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
