'use client';

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

interface LostLocationProps {
  latitude: number;
  longitude: number;
  lastKnownLocation?: string;
}

// Dynamic import for the map component to avoid SSR issues
const LostLocationMap = dynamic(
  () =>
    import('../../map/lost-location-map').then((mod) => mod.LostLocationMap),
  {
    ssr: false,
    loading: () => <Skeleton className='h-full w-full' />,
  },
);

export function LostLocation({ latitude, longitude }: LostLocationProps) {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='mb-2 text-sm font-medium text-gray-900'>
        Last Known location
      </div>
      <div className='relative z-10 h-48 w-full overflow-hidden rounded-lg bg-gray-200'>
        <LostLocationMap latitude={latitude} longitude={longitude} />
      </div>
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
