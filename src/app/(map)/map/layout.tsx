import { BottomNavigationBar } from '@/components/navigation/bottom-navigation-bar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex h-screen flex-col'>
      <div className='flex-1 overflow-hidden'>{children}</div>
      <div className='sticky right-0 bottom-0 left-0 z-50 w-full'>
        <BottomNavigationBar />
      </div>
    </div>
  );
}
