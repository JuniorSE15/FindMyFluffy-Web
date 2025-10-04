'use client';

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

interface FoundLocationProps {
  latitude: number;
  longitude: number;
  foundLocation?: string;
}

// Dynamic import for the map component to avoid SSR issues
const FoundLocationMap = dynamic(
  () =>
    import('../../map/found-location-map').then((mod) => mod.FoundLocationMap),
  {
    ssr: false,
    loading: () => <Skeleton className='h-full w-full' />,
  },
);

export function FoundLocation({ latitude, longitude }: FoundLocationProps) {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='mb-2 text-sm font-medium text-gray-900'>
        Found location
      </div>
      <div className='relative h-48 w-full overflow-hidden rounded-lg bg-gray-200'>
        <FoundLocationMap latitude={latitude} longitude={longitude} />
      </div>
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
