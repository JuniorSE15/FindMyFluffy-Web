'use client';

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import L, { LatLng } from 'leaflet';

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface MapPickerProps {
  address: string;
  onAddressChange: (address: string) => void;
  onLatLngChange: (latLng: LatLng) => void;
  defaultCenter?: LatLng;
}

async function geocodeAddress(address: string): Promise<LatLng | null> {
  if (!address) return null;
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address,
    )}`,
  );
  const data = await res.json();
  console.log('data', data);
  if (data && data.length > 0) {
    return new LatLng(parseFloat(data[0].lat), parseFloat(data[0].lon));
  }
  return null;
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
  );
  const data = await res.json();
  console.log('data', data);
  return data.display_name || `${lat}, ${lng}`;
}

function MapController({
  address,
  position,
  setPosition,
  onAddressChange,
  onLatLngChange,
  isSettingFromClick,
  setIsSettingFromClick,
}: {
  address: string;
  position: LatLng | null;
  setPosition: (pos: LatLng) => void;
  onAddressChange: (addr: string) => void;
  onLatLngChange: (latLng: LatLng) => void;
  isSettingFromClick: boolean;
  setIsSettingFromClick: (v: boolean) => void;
}) {
  const map = useMap();

  // Forward geocode only when user edits manually
  useEffect(() => {
    (async () => {
      if (address && !isSettingFromClick) {
        const coords = await geocodeAddress(address);
        if (coords) {
          setPosition(coords);
          onLatLngChange(coords);
          map.setView(coords, 15);
        }
      }
    })();
  }, [address, isSettingFromClick]);

  // Reverse geocode on map click
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const latLng = new LatLng(lat, lng);

      setIsSettingFromClick(true);
      setPosition(latLng);
      onLatLngChange(latLng);

      const addr = await reverseGeocode(lat, lng);
      onAddressChange(addr);
    },
  });

  return <>{position && <Marker position={position} />}</>;
}

export default function MapPicker({
  address,
  onAddressChange,
  onLatLngChange,
  defaultCenter = new LatLng(13.736717, 100.523186),
}: MapPickerProps) {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [isSettingFromClick, setIsSettingFromClick] = useState(false);

  // Listen for manual edits (from the form input)
  useEffect(() => {
    const resetFlag = () => setIsSettingFromClick(false);
    window.addEventListener('manual-address-edit', resetFlag);
    return () => window.removeEventListener('manual-address-edit', resetFlag);
  }, []);

  return (
    <div className='relative h-full w-full'>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MapController
          address={address}
          position={position}
          setPosition={setPosition}
          onAddressChange={onAddressChange}
          onLatLngChange={onLatLngChange}
          isSettingFromClick={isSettingFromClick}
          setIsSettingFromClick={setIsSettingFromClick}
        />
      </MapContainer>
    </div>
  );
}
