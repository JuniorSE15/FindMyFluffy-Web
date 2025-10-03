import Image from 'next/image';
import Link from 'next/link';
import { AlertCircle, Share } from 'lucide-react';
import { FoundPetPostResponse, LostPetPostResponse } from '@/types/post';
import { makeTimeAgo } from '@/utils/date';

export function Post(data: LostPetPostResponse | FoundPetPostResponse) {
  const petName = 'name' in data ? data.name : 'Unknown Pet';
  const bounty = data.isLost && 'bounty' in data ? data.bounty : undefined;

  const title = data.isLost ? `${petName}!` : `${petName}`;
  const tag = data.isLost ? `Lost ${data.type}` : `Found ${data.type}`;
  const href = data.isLost
    ? `/post/lost/${data.postId}`
    : `/post/found/${data.postId}`;

  return (
    <div className='bg-white'>
      {/* Header */}
      <div className='mb-2 flex items-center justify-between'>
        <div className='text-sm text-gray-500'>
          {makeTimeAgo(data.postDatetime)}
        </div>
      </div>

      {/* Title */}
      <h2 className='mb-2 text-lg font-bold text-gray-900'>
        <Link href={href} className='hover:underline'>
          {title}
        </Link>
      </h2>

      {/* Tags */}
      <div className='mb-4 flex items-center gap-2'>
        <span className='inline-block rounded-full bg-orange-500 px-3 py-1 text-sm font-medium text-white'>
          {tag}
        </span>
        {bounty && data.isLost ? (
          <span className='inline-block rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white'>
            ${bounty} Reward
          </span>
        ) : null}
      </div>

      {/* Image */}
      <div className='mb-4'>
        <Link href={href} className='block'>
          <div className='relative h-64 w-full overflow-hidden rounded-lg bg-gray-200'>
            <Image
              src={'/images/default-pet.png'}
              alt={title}
              fill
              className='object-cover'
            />
          </div>
        </Link>
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-1'>
          <AlertCircle className='h-5 w-5 text-gray-400' />
          <span className='text-sm text-gray-500'>{0}</span>
        </div>
        <div className='flex items-center'>
          <Share className='h-5 w-5 text-gray-400' />
        </div>
      </div>

      {/* Separator */}
      <div className='mt-4 border-t border-gray-200'></div>
    </div>
  );
}
