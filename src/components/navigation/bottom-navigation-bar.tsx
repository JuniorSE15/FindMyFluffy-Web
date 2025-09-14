'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, PlusIcon, MapIcon, BellIcon, UserIcon } from 'lucide-react';

const BOTTOM_NAVBAR_ITEMS = [
  {
    label: 'Home',
    icon: <HomeIcon className='text-secondary-text' />,
    activeIcon: <HomeIcon className='text-secondary-bg' />,
    href: '/',
  },
  {
    label: 'Maps',
    icon: <MapIcon className='text-secondary-text' />,
    activeIcon: <MapIcon className='text-secondary-bg' />,
    href: '/maps',
  },
  {
    label: 'New',
    icon: <PlusIcon className='text-secondary-text' />,
    activeIcon: <PlusIcon className='text-secondary-bg' />,
    href: '/new',
  },
  {
    label: 'Notifications',
    icon: <BellIcon className='text-secondary-text' />,
    activeIcon: <BellIcon className='text-secondary-bg' />,
    href: '/notifications',
  },
  {
    label: 'Account',
    icon: <UserIcon className='text-secondary-text' />,
    activeIcon: <UserIcon className='text-secondary-bg' />,
    href: '/account',
  },
];

export const BottomNavigationBar = () => {
  const pathname = usePathname();

  return (
    <nav
      className='flex h-16 justify-center px-6 pt-2'
      style={{
        boxShadow:
          '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className='flex w-full items-center justify-between'>
        {BOTTOM_NAVBAR_ITEMS.map((item) =>
          item.href === '/new' ? (
            <div
              key={item.href}
              className='flex w-16 flex-col items-center justify-center gap-2'
            >
              {item.activeIcon}
              <span className='text-[10px] font-bold'>{item.label}</span>
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`flex w-16 cursor-pointer flex-col items-center justify-center gap-2`}
            >
              {pathname === item.href ? item.activeIcon : item.icon}
              <span
                className={`text-[10px] font-bold ${pathname === item.href ? 'text-secondary-bg' : 'text-secondary-text'}`}
              >
                {item.label}
              </span>
            </Link>
          ),
        )}
      </div>
    </nav>
  );
};
