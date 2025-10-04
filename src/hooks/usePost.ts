import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getTimelinesAction,
  reportFoundPetPostAction,
} from '@/services/post.service';
import { toast } from 'sonner';
import { PostTimelineQueryParams } from '@/types/post';

export const usePost = ({ postId }: PostTimelineQueryParams) => {
  const queryClient = useQueryClient();

  const {
    data: timelines,
    isLoading: isTimelinesLoading,
    error: isTimelinesError,
    refetch: refetchTimelines,
  } = useQuery({
    queryKey: ['timelines', postId],
    queryFn: async () => {
      const timelines = await getTimelinesAction(postId as string);
      return timelines;
    },
    enabled: !!postId,
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const reportFoundPetPostMutation = useMutation({
    mutationFn: reportFoundPetPostAction,
    onSuccess: (data, variables) => {
      // Invalidate timelines for the specific post
      queryClient.invalidateQueries({
        queryKey: ['timelines', variables.postId],
      });

      // Invalidate all timeline queries
      queryClient.invalidateQueries({
        queryKey: ['timelines'],
      });

      // Invalidate post queries
      queryClient.invalidateQueries({
        queryKey: ['post', 'lost', variables.postId],
      });

      // Force refetch the timelines
      refetchTimelines();

      toast.success('Found pet post reported successfully!');
    },
    onError: (error) => {
      toast.error('Failed to report found pet post: ', {
        description: error.message,
      });
    },
  });

  return {
    timelines,
    isTimelinesLoading,
    isTimelinesError,
    refetchTimelines,
    reportFoundPetPostMutation,
  };
};
