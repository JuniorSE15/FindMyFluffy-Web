'use client';

import Image from 'next/image';

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
    </nav>
  );
};
