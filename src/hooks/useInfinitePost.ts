import {
  getPostByIdAction,
  getPostsAction,
  getUserPostsAction,
} from '@/services/post.service';
import {
  FoundPetPostResponse,
  LostPetPostResponse,
  PostQueryParams,
} from '@/types/post';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

// Infinite query hooks for load more functionality
export type UseInfiniteLostPostsReturn = {
  posts: LostPetPostResponse[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  postQueryById: LostPetPostResponse | undefined;
  isLoadingPostById: boolean;
  errorPostById: Error | null;
};

export type UseInfiniteFoundPostsReturn = {
  posts: FoundPetPostResponse[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  postQueryById: FoundPetPostResponse | undefined;
  isLoadingPostById: boolean;
  errorPostById: Error | null;
};

export const useInfiniteLostPosts = ({
  take = 10,
  userId,
  isLost = true,
  postId = undefined,
}: Omit<PostQueryParams, 'skip'> = {}): UseInfiniteLostPostsReturn => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', 'lost', 'infinite', { take, userId, isLost }],
    queryFn: async ({ pageParam = 0 }) => {
      const skip = (pageParam as number) * take;
      const posts = await getPostsAction<LostPetPostResponse>({
        isLost: true,
        skip,
        take,
        userId,
        postId,
      });
      if (!posts) {
        throw new Error('Posts not found');
      }
      return posts;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer items than take, we've reached the end
      if (lastPage.length < take) {
        return undefined;
      }
      // Return the next page number (0-based)
      return allPages.length;
    },
    enabled: isLost,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const {
    data: postQueryById,
    isLoading: isLoadingPostById,
    error: errorPostById,
  } = useQuery<LostPetPostResponse>({
    queryKey: ['post', postId],
    queryFn: async () => {
      const post = await getPostByIdAction<LostPetPostResponse>(
        postId as string,
      );
      return post;
    },
    enabled: !!postId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 5,
  });

  // Flatten all pages into a single array and deduplicate by ID
  const allPosts = data?.pages?.flat() ?? [];
  const uniquePosts = new Map();
  allPosts.forEach((post) => {
    if (!uniquePosts.has(post.id)) {
      uniquePosts.set(post.id, post);
    }
  });
  const posts = Array.from(uniquePosts.values());

  return {
    posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage: hasNextPage ?? false,
    error,
    fetchNextPage,
    postQueryById,
    isLoadingPostById,
    errorPostById,
  };
};

export const useInfiniteFoundPosts = ({
  take = 10,
  isLost = false,
  userId,
  postId = undefined,
}: Omit<PostQueryParams, 'skip'> = {}): UseInfiniteFoundPostsReturn => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', 'found', 'infinite', { take, userId, isLost }],
    queryFn: async ({ pageParam = 0 }) => {
      const skip = (pageParam as number) * take;
      const posts = await getPostsAction<FoundPetPostResponse>({
        isLost: false,
        skip,
        take,
        userId,
        postId,
      });
      if (!posts) {
        throw new Error('Posts not found');
      }
      return posts;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer items than take, we've reached the end
      if (lastPage.length < take) {
        return undefined;
      }
      // Return the next page number (0-based)
      return allPages.length;
    },
    enabled: !isLost,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const {
    data: postQueryById,
    isLoading: isLoadingPostById,
    error: errorPostById,
  } = useQuery<FoundPetPostResponse>({
    queryKey: ['post', postId],
    queryFn: async () => {
      const post = await getPostByIdAction<FoundPetPostResponse>(
        postId as string,
      );
      return post;
    },
    enabled: !!postId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 5,
  });

  // Flatten all pages into a single array and deduplicate by ID
  const allPosts = data?.pages?.flat() ?? [];
  const uniquePosts = new Map();
  allPosts.forEach((post) => {
    if (!uniquePosts.has(post.id)) {
      uniquePosts.set(post.id, post);
    }
  });
  const posts = Array.from(uniquePosts.values());

  return {
    posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage: hasNextPage ?? false,
    error,
    fetchNextPage,
    postQueryById,
    isLoadingPostById,
    errorPostById,
  };
};

// Hook for fetching user's lost posts
export const useUserLostPosts = (userId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user-posts', 'lost', userId],
    queryFn: async () => {
      const posts = await getUserPostsAction<LostPetPostResponse>(userId);
      if (!posts) {
        throw new Error('User posts not found');
      }
      // Filter for lost posts only
      return posts.filter((post) => post.isLost);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return {
    posts: data || [],
    isLoading,
    error,
  };
};

// Hook for fetching user's found posts
export const useUserFoundPosts = (userId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user-posts', 'found', userId],
    queryFn: async () => {
      const posts = await getUserPostsAction<FoundPetPostResponse>(userId);
      if (!posts) {
        throw new Error('User posts not found');
      }
      // Filter for found posts only
      return posts.filter((post) => !post.isLost);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return {
    posts: data || [],
    isLoading,
    error,
  };
};
