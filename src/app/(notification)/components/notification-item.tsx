'use client';

import React from 'react';
import { NotificationBase } from '@/types/notification';
import { NotificationIcon } from './notification-icon';

interface NotificationItemProps {
  notification: NotificationBase;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const content = (
    <div className='flex items-center gap-4 border-b border-gray-100 bg-white px-6 py-5 transition-colors hover:bg-gray-50'>
      {/* Notification icon */}
      <div className='flex-shrink-0'>
        <NotificationIcon type={notification.type} />
      </div>

      {/* Content */}
      <div className='min-w-0 flex-1'>
        <h3 className='text-sm font-medium text-gray-900'>
          {notification.title}
        </h3>
        <p className='mt-1 line-clamp-1 text-sm text-gray-600'>
          {notification.description}
        </p>
      </div>

      {/* Timestamp */}
      <div className='flex-shrink-0'>
        <span className='text-xs text-gray-500'>
          {formatTimestamp(notification.createdAt)}
        </span>
      </div>
    </div>
  );

  return content;
};
