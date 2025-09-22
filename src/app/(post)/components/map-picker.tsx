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
import L from 'leaflet';
import { Locate } from 'lucide-react';

interface MapPickerProps {
  address: string;
  onAddressChange: (address: string) => void;
  onLatLngChange: (lat: number, lng: number) => void;
  defaultCenter?: [number, number];
}

async function geocodeAddress(
  address: string,
): Promise<[number, number] | null> {
  if (!address) return null;
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
  );
  const data = await res.json();
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }
  return null;
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
  );
  const data = await res.json();
  return data.display_name || `${lat}, ${lng}`;
}

function MapController({
  address,
  position,
  setPosition,
  onAddressChange,
  onLatLngChange,
}: {
  address: string;
  position: [number, number] | null;
  setPosition: (pos: [number, number]) => void;
  onAddressChange: (addr: string) => void;
  onLatLngChange: (lat: number, lng: number) => void;
}) {
  const map = useMap();

  // When address changes → forward geocode → move map
  useEffect(() => {
    (async () => {
      if (address) {
        const coords = await geocodeAddress(address);
        if (coords) {
          setPosition(coords);
          onLatLngChange(coords[0], coords[1]);
          map.setView(coords, 15);
        }
      }
    })();
  }, [address]);

  // When user clicks → reverse geocode → update input
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLatLngChange(lat, lng);

      const addr = await reverseGeocode(lat, lng);
      onAddressChange(addr);
    },
  });

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition([lat, lng]);
        onLatLngChange(lat, lng);
        map.setView([lat, lng], 15);

        const addr = await reverseGeocode(lat, lng);
        onAddressChange(addr);
      },
      (err) => {
        alert('Unable to retrieve your location: ' + err.message);
      },
    );
  };

  return (
    <>
      {position && (
        <Marker
          position={position}
          icon={L.icon({
            iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
            shadowUrl:
              'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
          })}
        />
      )}

      {/* floating button inside map */}
      <div className='absolute top-2 right-2 z-[1000]'>
        <button
          type='button'
          onClick={handleLocate}
          className='flex items-center justify-center rounded-full bg-white p-2 shadow hover:bg-gray-100'
          title='Show My Location'
        >
          <Locate className='h-4 w-4 text-gray-600' />
        </button>
      </div>
    </>
  );
}

export default function MapPicker({
  address,
  onAddressChange,
  onLatLngChange,
  defaultCenter = [13.736717, 100.523186],
}: MapPickerProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);

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
        />
      </MapContainer>
    </div>
  );
}
