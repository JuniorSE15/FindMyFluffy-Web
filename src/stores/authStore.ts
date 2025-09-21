import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Session } from '@/types/auth';

interface AuthStore {
  session: Session | null;
  setSession: (session: Session | null) => void;
  accessToken: string | null;
  refreshToken: string | null;
  setToken: (accessToken: string | null, refreshToken: string | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      session: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setSession: (session) => set({ session }),
      setToken: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      logout: () =>
        set({
          session: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    { name: 'auth-storage' },
  ),
);
