'use client';

import { useMemo } from 'react';
import { NotificationItem } from '../components/notification-item';
import { NotificationListSkeleton } from '../components/notification-skeleton';
import { useNotification } from '@/hooks/useNotification';
import { useUser } from '@/hooks/useUser';

export default function NotificationPage() {
  const { user } = useUser();
  const { data: notifications, isLoading } = useNotification({
    userId: user?.id,
  });

  if (isLoading) {
    return (
      <div className='flex h-full flex-col bg-white'>
        {/* Header */}
        <div className='border-b border-gray-100 bg-white px-4 py-4'>
          <h1 className='text-center text-lg font-semibold text-gray-900'>
            Notifications
          </h1>
        </div>

        {/* Skeleton Loading */}
        <NotificationListSkeleton count={5} />
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col bg-white'>
      {/* Header */}
      <div className='border-b border-gray-100 bg-white px-4 py-4'>
        <h1 className='text-center text-lg font-semibold text-gray-900'>
          Notifications
        </h1>
      </div>

      {/* Notifications List */}
      <div className='flex-1 overflow-auto'>
        {notifications && notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <NotificationItem key={index} notification={notification} />
          ))
        ) : (
          <div className='flex h-full items-center justify-center text-gray-500'>
            <p>No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
