import { getNotificationsByUserIdAction } from '@/services/notification.service';
import { useQuery } from '@tanstack/react-query';
import {
  NotificationBase,
  NotificationQueryParams,
} from '@/types/notification';

export const useNotification = ({ userId }: NotificationQueryParams) => {
  const { data, isLoading, error } = useQuery<NotificationBase[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const notifications = await getNotificationsByUserIdAction(
        userId as string,
      );
      console.log('notifications', notifications);
      if (!notifications) {
        throw new Error('Notifications not found');
      }
      return notifications;
    },
    enabled: !!userId,
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return { data, isLoading, error };
};
