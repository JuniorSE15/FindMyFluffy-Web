'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AlertCircle, Share, ChevronLeft, ChevronRight } from 'lucide-react';
import { LostPetPostResponse } from '@/types/post';
import { useState } from 'react';
import { makeTimeAgo } from '@/utils/date';
import { Button } from '@/components/ui/button';

type Props = { post: LostPetPostResponse };

export function LostHeader({ post }: Props) {
  const router = useRouter();
  const images = ['/images/onboarding/pet.svg'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasMultiple = images.length > 1;
  const goPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className='bg-white'>
      {/* Top bar with back button */}
      <div className='flex h-16 items-center justify-between px-2 py-2 shadow-sm'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => router.back()}
          className='flex h-10 w-10 items-center gap-1 p-0 text-sm text-gray-700 hover:text-gray-900'
          aria-label='Go back'
        >
          <ChevronLeft className='h-5 w-5' />
        </Button>
        {/* (Removed time from here) */}
      </div>

      {/* Title & time on same row */}
      <div className='mt-6 flex items-center justify-between px-4 pb-1'>
        <h1 className='text-xl font-semibold text-gray-900'>{post.title}</h1>
        <span className='text-sm text-gray-500'>
          {makeTimeAgo(post.postDatetime)}
        </span>
      </div>

      {/* Tag */}
      <div className='px-4 pb-3'>
        <span className='inline-block rounded-full bg-orange-500 px-3 py-1 text-sm font-medium text-white'>
          Lost
        </span>
      </div>

      {/* Image carousel */}
      <div className='mb-2 px-4'>
        <div className='relative h-56 w-full overflow-hidden rounded-lg bg-gray-200'>
          <Image
            src={images[currentIndex]}
            alt={post.title}
            fill
            className='object-cover'
          />
          {hasMultiple ? (
            <>
              <button
                type='button'
                onClick={goPrev}
                className='absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60'
                aria-label='Previous image'
              >
                <ChevronLeft className='h-4 w-4' />
              </button>
              <button
                type='button'
                onClick={goNext}
                className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60'
                aria-label='Next image'
              >
                <ChevronRight className='h-4 w-4' />
              </button>
              <div className='absolute right-2 bottom-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white'>
                {currentIndex + 1} / {images.length}
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Footer actions */}
      <div className='px-4 pb-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1'>
            <AlertCircle className='h-5 w-5 text-gray-400' />
            <span className='text-sm text-gray-500'>{0}</span>
          </div>
          <Share className='h-5 w-5 text-gray-400' />
        </div>
      </div>
      <div className='h-2 w-full bg-[#F8F7F4]' />
    </div>
  );
}
