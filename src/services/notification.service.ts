import { NotificationBase } from '@/types/notification';
import { baseApiAction } from './api.service';

export async function getNotificationsByUserIdAction(userId: string) {
  try {
    const response = await baseApiAction<NotificationBase[]>(
      `/api/notifications/logs/${userId}`,
      {
        method: 'GET',
        requiresAuth: true,
      },
    );

    console.log('response', response);

    if (response.error) {
      throw new Error(response.error.detail);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
