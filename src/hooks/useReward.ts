import {
  redeemRewardAction,
  getRewardByIdAction,
  getRewardsAction,
} from '@/services/reward.service';
import { Reward, RewardQueryParams } from '@/types/reward.d';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

export type UseRewardReturn = {
  rewards: Reward[] | undefined;
  isRewardsLoading: boolean;
  isRewardsError: Error | null;
  rewardQueryById: Reward | undefined;
  isRewardQueryByIdLoading: boolean;
  isRewardQueryByIdError: Error | null;
  rewardRedeemMutation: UseMutationResult<
    Reward | undefined,
    Error,
    { rewardId: string; amount: number }
  >;
};

export const useReward = ({
  rewardId = undefined,
}: RewardQueryParams = {}): UseRewardReturn => {
  const queryClient = useQueryClient();

  const {
    data: rewards,
    isLoading: isRewardsLoading,
    error: isRewardsError,
  } = useQuery({
    queryKey: ['rewards'],
    queryFn: async () => {
      const rewards = await getRewardsAction();
      return rewards;
    },
  });

  const {
    data: rewardQueryById,
    isLoading: isRewardQueryByIdLoading,
    error: isRewardQueryByIdError,
  } = useQuery({
    queryKey: ['reward', rewardId],
    queryFn: async () => {
      if (!rewardId) {
        throw new Error('Reward ID is required');
      }
      const reward = await getRewardByIdAction(rewardId);
      return reward;
    },
    enabled: !!rewardId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const rewardRedeemMutation = useMutation({
    mutationFn: async ({
      rewardId,
      amount,
    }: {
      rewardId: string;
      amount: number;
    }) => {
      if (!rewardId) {
        throw new Error('Reward ID is required');
      }
      const reward = await redeemRewardAction(rewardId, amount);
      return reward;
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['rewards'] });
        queryClient.invalidateQueries({ queryKey: ['reward', rewardId] });
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      }
      toast.success('Reward redeemed successfully!');
    },
    onError: (error) => {
      toast.error('Reward redemption failed: ', {
        description:
          error instanceof Error ? error.message : 'Please try again later.',
      });
    },
  });

  return {
    rewards,
    isRewardsLoading,
    isRewardsError,
    rewardQueryById,
    isRewardQueryByIdLoading,
    isRewardQueryByIdError,
    rewardRedeemMutation,
  };
};
