'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const NotificationSkeleton: React.FC = () => {
  return (
    <div className='flex items-center gap-4 border-b border-gray-100 bg-white px-6 py-5'>
      {/* Notification icon skeleton */}
      <div className='flex-shrink-0'>
        <Skeleton className='h-10 w-10 rounded-full' />
      </div>

      {/* Content skeleton */}
      <div className='min-w-0 flex-1 space-y-2'>
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-3 w-full' />
      </div>

      {/* Timestamp skeleton */}
      <div className='flex-shrink-0'>
        <Skeleton className='h-3 w-16' />
      </div>
    </div>
  );
};

export const NotificationListSkeleton: React.FC<{ count?: number }> = ({
  count = 5,
}) => {
  return (
    <div className='flex-1 overflow-auto'>
      {Array.from({ length: count }).map((_, index) => (
        <NotificationSkeleton key={index} />
      ))}
    </div>
  );
};
