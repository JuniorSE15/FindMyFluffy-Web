import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import { getCurrentUserAction } from '@/services/user.service';

export const useCurrentUser = () => {
  const { user, isLoading, error, setUser, setLoading, setError } =
    useUserStore();

  const fetchCurrentUser = async (forceRefresh = false) => {
    // If user data exists and we're not forcing a refresh, don't fetch
    if (user && !forceRefresh) {
      return user;
    }

    setLoading(true);
    setError(null);

    try {
      const userData = await getCurrentUserAction();
      setUser(userData);
      return userData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch user';
      setError(errorMessage);
      console.error('Error fetching current user:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = () => fetchCurrentUser(true);

  // Only fetch on initial load if user data doesn't exist
  useEffect(() => {
    if (!user && !isLoading && !error) {
      fetchCurrentUser();
    }
  }, [user, isLoading, error]);

  return {
    user,
    isLoading,
    error,
    fetchCurrentUser,
    refreshUser,
  };
};
