'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Navigator: React.FC<{
  currentPage: string;
}> = ({ currentPage }) => {
  const router = useRouter();

  return (
    <div className='flex w-full items-center justify-between'>
      <Button
        variant='outline'
        size='icon'
        className='size-10 rounded-full'
        onClick={() => router.push('/welcome')}
      >
        <ChevronLeftIcon size={24} className='text-primary' />
      </Button>
      <h2 className='text-primary absolute left-1/2 -translate-x-1/2 transform text-lg font-normal'>
        {currentPage}
      </h2>
      <div className='h-10 w-10'></div>{' '}
    </div>
  );
};
