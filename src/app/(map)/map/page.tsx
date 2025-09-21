'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Loader2Icon } from 'lucide-react';

export default function Map() {
  const MapComponent = useMemo(
    () =>
      dynamic(() => import('../components/map/map-component'), {
        ssr: false,
        loading: () => (
          <div className='bg-background flex h-full w-full items-center justify-center'>
            <div className='text-center'>
              <div className='mb-2 flex items-center gap-2 text-lg'>
                <Loader2Icon className='animate-spin' />
                Loading...
              </div>
            </div>
          </div>
        ),
      }),
    [],
  );

  return <MapComponent />;
}
