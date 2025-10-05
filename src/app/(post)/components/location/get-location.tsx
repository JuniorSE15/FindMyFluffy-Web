'use client';

import { useCallback, useEffect, useState } from 'react';
import { reverseGeocode } from '@/services/location.service';
import { Skeleton } from '@/components/ui/skeleton';

interface LocationProps {
  latitude: number;
  longitude: number;
}

export const GetLocation = ({ latitude, longitude }: LocationProps) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<string | null>(null);

  const handleGetLocation = useCallback(async () => {
    try {
      // Validate coordinates before making API call
      if (
        !latitude ||
        !longitude ||
        typeof latitude !== 'number' ||
        typeof longitude !== 'number' ||
        isNaN(latitude) ||
        isNaN(longitude) ||
        latitude < -90 ||
        latitude > 90 ||
        longitude < -180 ||
        longitude > 180
      ) {
        setLocation('Location unavailable');
        return;
      }

      setLoading(true);
      const location = await reverseGeocode(latitude, longitude);
      setLocation(location.display_name);
      setLoading(false);
    } catch (error) {
      console.error('Error getting location:', error);
      setLoading(false);
      // Provide fallback with coordinates if reverse geocoding fails
      if (latitude && longitude && !isNaN(latitude) && !isNaN(longitude)) {
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      } else {
        setLocation('Location unavailable');
      }
    }
  }, [latitude, longitude]);

  useEffect(() => {
    handleGetLocation();
  }, [handleGetLocation]);

  if (loading) {
    return <Skeleton className='h-4 w-full' />;
  }

  return <span>{location}</span>;
};
