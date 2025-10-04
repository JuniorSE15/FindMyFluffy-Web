import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface UserStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
  updateUserPoints: (points: number) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user, error: null }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error, isLoading: false }),
      clearUser: () => set({ user: null, error: null, isLoading: false }),
      updateUserPoints: (points) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, point: points } });
        }
      },
    }),
    {
      name: 'user-storage',
      version: 1,
    },
  ),
);
