export type Reward = {
  id: string;
  name: string;
  description: string;
  point: number;
  stock: number;
};

export type RedeemedReward = {
  id: string;
  rewardId: string;
  reward: Reward;
  redeemedAt: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
};

export type RewardQueryParams = {
  rewardId?: string;
};
