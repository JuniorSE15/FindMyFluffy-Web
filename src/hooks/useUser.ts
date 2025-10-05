import { useQuery } from '@tanstack/react-query';
import { getCurrentUserAction } from '@/services/user.service';

export const useUser = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const user = await getCurrentUserAction();
        return user;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return { user, isLoading, error };
};
