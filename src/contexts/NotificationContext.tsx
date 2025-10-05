'use client';

import React, { createContext, useContext, useCallback, useState } from 'react';
import { useSSE, SSEMessage } from '@/hooks/useSSE';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: number;
  title: string;
  message: string;
  data?: SSEMessage;
  timestamp: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
  isConnected: boolean;
  isReconnecting: boolean;
  reconnect: () => void;
}

type MappedMessage = {
  title: string;
  description: string;
  createdAt: string;
  type: number;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider',
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
  userId?: string;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  userId,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleIncomingMessage = useCallback((message: SSEMessage) => {
    // Map server properties to expected format
    const mappedMessage: MappedMessage = {
      title: message.Title || message.title || 'Notification',
      description: message.Description || message.description || '',
      createdAt:
        message.CreatedAt || message.createdAt || new Date().toISOString(),
      type: message.Type || message.type || 2000,
    };

    const notification: Notification = {
      id: mappedMessage.createdAt,
      type: mappedMessage.type,
      title: getNotificationTitle(mappedMessage),
      message: getNotificationMessage(mappedMessage),
      data: message,
      timestamp: mappedMessage.createdAt,
      read: false,
    };

    // Add to notifications list
    setNotifications((prev) => [notification, ...prev.slice(0, 49)]); // Keep last 50

    // Show toast notification
    showToastNotification(notification);
  }, []);

  // SSE connection for real-time notifications
  const { isConnected, isReconnecting, reconnect } = useSSE({
    url: userId
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/subscribe?userId=${userId}`
      : '',
    enabled: !!userId,
    onMessage: useCallback(
      (message: SSEMessage) => {
        handleIncomingMessage(message);
      },
      [handleIncomingMessage],
    ),
    onError: useCallback((error: Event) => {
      console.error('SSE Error:', error);
    }, []),
    onOpen: useCallback(() => {
      console.log('SSE Connected');
    }, []),
    onClose: useCallback(() => {
      console.log('SSE Disconnected');
    }, []),
  });

  const getNotificationTitle = (message: MappedMessage): string => {
    switch (message.type) {
      case 2000:
        return 'New Notification';
      case 2001:
        return 'Match Alert';
      case 2002:
        return 'Reported Sighting';
      default:
        return 'New Notification';
    }
  };

  const getNotificationMessage = (message: MappedMessage): string => {
    switch (message.type) {
      case 2000:
        return `You have a new notification: ${message.description || 'Check details'}`;
      case 2001:
        return `You have a new match alert: ${message.description || 'Check details'}`;
      case 2002:
        return `Someone reported a sighting for your lost pet: ${message.description || 'Check details'}`;
      default:
        return 'You have a new notification';
    }
  };

  const showToastNotification = (notification: Notification) => {
    switch (notification.type) {
      case 2000:
        toast.success(notification.title, {
          description: notification.message,
          duration: 8000,
        });
        break;
      case 2001:
        toast.info(notification.title, {
          description: notification.message,
          duration: 8000,
        });
        break;
      case 2002:
        toast(notification.title, {
          description: notification.message,
          duration: 8000,
        });
        break;
      default:
        toast(notification.title, {
          description: notification.message,
          duration: 8000,
        });
        break;
    }
  };

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const contextValue: NotificationContextType = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
    isConnected,
    isReconnecting,
    reconnect,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
