'use client';

import { useState, useMemo } from 'react';
import { NotificationItem } from '../components/notification-item';
import { MOCK_NOTIFICATIONS } from '@/constants/notification';
import { type Notification } from '@/types/notification';

export default function NotificationPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);

  // Sort by timestamp (newest first)
  const sortedNotifications = useMemo(() => {
    return notifications.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }, [notifications]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, status: 'read' as const }
          : notification,
      ),
    );
  };

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
        {sortedNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
          />
        ))}
      </div>
    </div>
  );
}
