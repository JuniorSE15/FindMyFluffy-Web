'use client';

import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, MapIcon, UserIcon, PlusIcon, BellIcon } from 'lucide-react';
import { LostFoundPopup } from './lost-found-popup';

const BUTTOM_NAVBAR_ITEMS = [
  {
    label: 'Home',
    icon: <HomeIcon className='text-secondary-text' />,
    activeIcon: <HomeIcon className='text-interface-secondary' />,
    href: '/',
  },
  {
    label: 'Map',
    icon: <MapIcon className='text-secondary-text' />,
    activeIcon: <MapIcon className='text-secondary-bg' />,
    href: '/map',
  },
  {
    label: 'New',
    icon: <PlusIcon className='text-secondary-text' />,
    activeIcon: <PlusIcon />,
    href: '/new',
  },
  {
    label: 'Notification',
    icon: <BellIcon className='text-secondary-text' />,
    activeIcon: <BellIcon className='text-interface-secondary' />,
    href: '/notification',
  },
  {
    label: 'Account',
    icon: <UserIcon className='text-secondary-text' />,
    activeIcon: <UserIcon className='text-interface-secondary' />,
    href: '/profile',
  },
];

export const BottomNavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <Fragment>
      <nav
        className='relative z-50 flex h-16 max-w-xl justify-center bg-white px-6 pt-2'
        style={{
          boxShadow:
            '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div className='flex w-full items-center justify-between'>
          {BUTTOM_NAVBAR_ITEMS.map((item) =>
            item.href === '/new' ? (
              <div
                key={item.href}
                className='text-secondary-text hover:text-interface-secondary flex w-16 flex-col items-center justify-center gap-2'
                onClick={() => setIsOpen(!isOpen)}
              >
                {item.activeIcon}
                <span className='text-[10px] font-bold'>{item.label}</span>
              </div>
            ) : (
              <BottomNavigationBarItem
                key={item.href}
                pathname={pathname}
                label={item.label}
                icon={item.icon}
                activeIcon={item.activeIcon}
                href={item.href}
              />
            ),
          )}
        </div>
      </nav>
      <LostFoundPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Fragment>
  );
};

const BottomNavigationBarItem = ({
  pathname,
  label,
  icon,
  activeIcon,
  href,
}: {
  pathname: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className='flex w-16 cursor-pointer flex-col items-center justify-center gap-2'
    >
      {pathname === href ? activeIcon : icon}
      <span
        className={`text-[10px] font-bold ${pathname === href ? 'text-interface-secondary' : 'text-secondary-text'}`}
      >
        {label}
      </span>
    </Link>
  );
};
