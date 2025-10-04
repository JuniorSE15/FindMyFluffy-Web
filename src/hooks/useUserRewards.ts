import { getUserRewardsAction } from '@/services/reward.service';
import { RedeemedReward } from '@/types/reward.d';
import { useQuery } from '@tanstack/react-query';

export type UseUserRewardsReturn = {
  userRewards: RedeemedReward[] | undefined;
  isUserRewardsLoading: boolean;
  isUserRewardsError: Error | null;
};

export const useUserRewards = (): UseUserRewardsReturn => {
  const {
    data: userRewards,
    isLoading: isUserRewardsLoading,
    error: isUserRewardsError,
  } = useQuery({
    queryKey: ['userRewards'],
    queryFn: async () => {
      const userRewards = await getUserRewardsAction();
      return userRewards;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    userRewards,
    isUserRewardsLoading,
    isUserRewardsError,
  };
};
