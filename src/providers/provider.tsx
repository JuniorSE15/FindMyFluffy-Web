'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { useUser } from '@/hooks/useUser';

const queryClient = new QueryClient();

function AppWithNotifications({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  return (
    <NotificationProvider userId={user?.id}>{children}</NotificationProvider>
  );
}

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWithNotifications>{children}</AppWithNotifications>
    </QueryClientProvider>
  );
}
