import { useEffect, useState } from 'react';
import { LatLng } from 'leaflet';
import { useMapEvents, Marker, Popup } from 'react-leaflet';

const MAX_ZOOM = 16;

interface LocationMarkerProps {
  onLocationFound: (location: LatLng) => void;
}

export const LocationMarker = ({ onLocationFound }: LocationMarkerProps) => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [error, setError] = useState<string | null>(null);

  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      setError(null);
      onLocationFound(e.latlng);
      map.flyTo(e.latlng, MAX_ZOOM); // Zoom closer when location is found
    },
    locationerror(e) {
      setError(e.message);
      console.error('Location error:', e.message);
    },
  });

  // Auto-locate on component mount
  useEffect(() => {
    map.locate({ setView: false, maxZoom: MAX_ZOOM });
  }, [map]);

  // Listen for manual location requests
  useEffect(() => {
    const handleLocationRequest = () => {
      setError(null);
      map.locate({ setView: true, maxZoom: MAX_ZOOM });
    };

    window.addEventListener('requestLocation', handleLocationRequest);
    return () =>
      window.removeEventListener('requestLocation', handleLocationRequest);
  }, [map]);

  if (error) {
    return (
      <Popup position={map.getCenter()}>
        <div className='text-red-600'>
          <strong>Location Error:</strong>
          <br />
          {error}
        </div>
      </Popup>
    );
  }

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        <div className='text-center'>
          <strong>📍 You are here</strong>
          <br />
          <small>
            Lat: {position.lat.toFixed(6)}
            <br />
            Lng: {position.lng.toFixed(6)}
          </small>
        </div>
      </Popup>
    </Marker>
  );
};
