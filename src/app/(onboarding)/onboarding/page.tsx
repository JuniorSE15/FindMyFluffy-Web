'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DotIndicator } from '@/components/indicators/dot-indicator';
import { ONBOARDING_DETAILS } from '@/constants/onboarding';
import { Carousel } from '../conponents/carousel/carousel';

export default function Onboarding() {
  const [page, setPage] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (page < ONBOARDING_DETAILS.length - 1) {
      setPage(page + 1);
    } else {
      router.push('/welcome');
    }
  };

  const renderYellowPaw = () => {
    if (page === 1) {
      return (
        <Image
          src='/images/onboarding/yellow-paw.svg'
          alt='logo'
          width={100}
          height={100}
          className='animate-in absolute top-[55%] right-0 h-auto w-24'
        />
      );
    }
  };

  return (
    <div className='relative flex h-full min-h-screen w-full items-center justify-center px-10 py-6'>
      {renderYellowPaw()}
      <div className='flex flex-col items-center justify-center gap-6'>
        <div className='flex w-full flex-col'>
          <div className='flex w-full max-w-80 items-start justify-start'>
            <Image
              src='/images/onboarding/paw.svg'
              alt='logo'
              width={100}
              height={100}
              className='h-auto w-full max-w-12'
            />
          </div>
          <div className='relative flex overflow-hidden'>
            <Carousel page={page} />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='text-primary-text text-center text-[2rem] leading-10 font-bold'>
            Find a <span className='text-primary-bg'>Lost Pet</span> <br /> Near
            You!
          </h1>
          <p className='text-secondary-text text-center text-sm font-normal'>
            {ONBOARDING_DETAILS[page].description}
          </p>
        </div>
        <div className='space-y-4'>
          <Button
            className={`bg-secondary-bg text-primary-foreground hover:bg-secondary-bg/80 w-64 cursor-pointer rounded-full py-6 transition-all duration-300 ease-in-out ${
              page === ONBOARDING_DETAILS.length - 1 ? 'size-[100px]' : ''
            }`}
            size='lg'
            onClick={() => handleNext()}
          >
            {ONBOARDING_DETAILS[page].button}
          </Button>
          <DotIndicator
            index={page}
            total={ONBOARDING_DETAILS.length}
            onClick={setPage}
          />
        </div>
      </div>
    </div>
  );
}
