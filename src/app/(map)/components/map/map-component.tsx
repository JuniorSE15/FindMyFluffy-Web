'use client';

import { useState, useEffect } from 'react';
import { LatLng } from 'leaflet';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { MapPinIcon } from 'lucide-react';
import { NearbyPin } from './nearby-pin';
import { LocationMarker } from './location-marker';
import { NEARBY_PINS_OFFSETS, createPinWithPosition } from '@/constants/map';
import { TopBar } from '../top-bar/top-bar';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const DEFAULT_CENTER = new LatLng(13.736717, 100.523186);
export const TILE_LAYER_URL =
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const DEFAULT_ZOOM = 16;

export default function MapComponent() {
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation(
        new LatLng(position.coords.latitude, position.coords.longitude),
      );
    });
  }, []);

  const locateCurrentLocation = () => {
    setCurrentLocation(null);
    window.dispatchEvent(new CustomEvent('requestLocation'));
  };

  return (
    <div className='relative h-full w-full max-w-xl overflow-hidden'>
      <div className='absolute top-0 right-0 left-0 z-50 bg-white'>
        <TopBar />
      </div>
      <div className='h-full w-full pt-16'>
        <MapContainer
          center={currentLocation || DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={false}
          zoomControl={false}
          className='z-0 h-full w-full'
        >
          <TileLayer attribution={ATTRIBUTION} url={TILE_LAYER_URL} />
          <ZoomControl position='bottomright' />
          <LocationMarker onLocationFound={setCurrentLocation} />

          {NEARBY_PINS_OFFSETS.map((pinOffset) => {
            const pin = createPinWithPosition(
              pinOffset,
              currentLocation || DEFAULT_CENTER,
            );
            return <NearbyPin key={pin.id} {...pin} />;
          })}
        </MapContainer>
      </div>

      <Button
        variant='outline'
        size='icon'
        className='absolute top-20 right-4 z-50'
        onClick={locateCurrentLocation}
      >
        <MapPinIcon size={24} className='text-primary' />
      </Button>
    </div>
  );
}
