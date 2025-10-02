import { getPostsAction } from '@/services/post.service';
import {
  FoundPetPostResponse,
  LostPetPostResponse,
  PostQueryParams,
} from '@/types/post';
import { useQuery } from '@tanstack/react-query';

export type UseLostPostsReturn = {
  posts: LostPetPostResponse[] | undefined;
  isLoading: boolean;
  error: Error | null;
};

export type UseFoundPostsReturn = {
  posts: FoundPetPostResponse[] | undefined;
  isLoading: boolean;
  error: Error | null;
};

export const useLostPosts = ({
  limit = 10,
  userId,
  isLost = true,
}: PostQueryParams = {}): UseLostPostsReturn => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<LostPetPostResponse[] | undefined>({
    queryKey: ['posts', 'lost', userId],
    queryFn: async () => {
      const posts = await getPostsAction(true);
      if (!posts) {
        throw new Error('Posts not found');
      }
      console.log('lost posts', posts);
      return posts as LostPetPostResponse[];
    },
    enabled: isLost,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 5,
  });

  return { posts, isLoading, error };
};

export const useFoundPosts = ({
  limit = 10,
  isLost = false,
  userId,
}: PostQueryParams = {}): UseFoundPostsReturn => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<FoundPetPostResponse[]>({
    queryKey: ['posts', 'found', userId],
    queryFn: async () => {
      const posts = await getPostsAction(false);
      if (!posts) {
        throw new Error('Posts not found');
      }
      console.log('found posts', posts);
      return posts as FoundPetPostResponse[];
    },
    enabled: isLost,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 5,
  });
  return { posts, isLoading, error };
};
