import { baseApiAction } from './api.service';
import { Reward, RedeemedReward } from '@/types/reward.d';

export async function getRewardsAction() {
  try {
    const response = await baseApiAction<Reward[]>('/api/reward', {
      method: 'GET',
      requiresAuth: true,
    });

    if (response.error) {
      throw new Error(response.error.detail);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getRewardByIdAction(rewardId: string) {
  try {
    const response = await baseApiAction<Reward>(`/api/reward/${rewardId}`, {
      method: 'GET',
      requiresAuth: true,
    });

    if (response.error) {
      throw new Error(response.error.detail);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function redeemRewardAction(rewardId: string, amount: number) {
  try {
    const response = await baseApiAction<Reward>(`/api/reward/redeem`, {
      method: 'POST',
      body: { rewardId, amount },
      requiresAuth: true,
    });

    if (response.error) {
      throw new Error(response.error.detail);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserRewardsAction() {
  try {
    const response = await baseApiAction<RedeemedReward[]>(
      `/api/reward/redeem/currentUser`,
      {
        method: 'GET',
        requiresAuth: true,
      },
    );

    if (response.error) {
      throw new Error(response.error.detail);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
