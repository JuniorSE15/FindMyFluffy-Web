import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { getCurrentUserAction } from '@/services/user.service';

export const useUser = () => {
  const { isAuthenticated } = useAuthStore();
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
        console.error(error);
        throw error;
      }
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
  return { user, isLoading, error };
};
