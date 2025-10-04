'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Gift } from 'lucide-react';

export const TopNavigationBarProfile = () => {
  return (
    <nav className='relative flex h-16 w-full max-w-xl items-center bg-white px-6 pt-2 shadow-md'>
      <div className='absolute left-6 flex cursor-pointer items-center'>
        <Image
          src='/images/navigation/paw-2.svg'
          alt='logo'
          width={100}
          height={100}
          className='h-auto w-full max-w-12'
        />
      </div>

      <div className='text-primary-text flex w-full justify-center text-lg font-bold'>
        Profile
      </div>

      <div className='absolute right-6 flex cursor-pointer items-center'>
        <Link href='/reward'>
          <div className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-gray-100'>
            <Gift className='text-secondary-text h-6 w-6' />
          </div>
        </Link>
      </div>
    </nav>
  );
};
