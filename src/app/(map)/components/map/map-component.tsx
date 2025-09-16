'use client';

import { useState, useEffect } from 'react';
import { LatLng } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
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
const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const DEFAULT_ZOOM = 15;

export default function MapComponent() {
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation(
        new LatLng(position.coords.latitude, position.coords.longitude),
      );
    });
  }, []);

  const locatCurrentLocation = () => {
    setCurrentLocation(null);
    window.dispatchEvent(new CustomEvent('requestLocation'));
  };

  return (
    <div className='relative h-full w-full'>
      <div className='sticky top-0 left-0 z-50 w-full bg-white'>
        <TopBar />
      </div>
      <MapContainer
        center={currentLocation || DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={false}
        className='z-0 h-full w-full'
      >
        <TileLayer attribution={ATTRIBUTION} url={TILE_LAYER_URL} />
        <LocationMarker onLocationFound={setCurrentLocation} />

        {NEARBY_PINS_OFFSETS.map((pinOffset) => {
          const pin = createPinWithPosition(
            pinOffset,
            currentLocation || DEFAULT_CENTER,
          );
          return <NearbyPin key={pin.id} {...pin} />;
        })}
      </MapContainer>

      <Button
        variant='outline'
        size='icon'
        className='absolute top-20 right-4 z-[1000]'
        onClick={locatCurrentLocation}
      >
        <MapPinIcon size={24} className='text-primary' />
      </Button>
    </div>
  );
}
