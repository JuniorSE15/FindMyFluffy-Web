import {
  ATTRIBUTION,
  TILE_LAYER_URL,
} from '@/app/(map)/components/map/map-component';
import { LatLng } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  Popup,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface FoundLocationMapProps {
  latitude: number;
  longitude: number;
}

export const FoundLocationMap = ({
  latitude,
  longitude,
}: FoundLocationMapProps) => {
  return (
    <div className='relative h-full w-full'>
      <MapContainer
        center={new LatLng(latitude, longitude)}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer attribution={ATTRIBUTION} url={TILE_LAYER_URL} />
        <ZoomControl position='bottomright' />
        <Marker position={new LatLng(latitude, longitude)}>
          <Popup>
            <div className='text-center'>
              <strong>📍 Found location</strong>
              <br />
              <small>
                Lat: {latitude.toFixed(6)}
                <br />
                Lng: {longitude.toFixed(6)}
              </small>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
