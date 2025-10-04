import { baseApiAction } from './api.service';
import { User } from '@/types/user';

export async function getUserByIdAction(userId: string) {
  try {
    const response = await baseApiAction<User>(`/api/users/${userId}`);
    if (response.error) {
      throw new Error(response.error.detail);
    }

    if (!response.data) {
      throw new Error('No data received from API');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
