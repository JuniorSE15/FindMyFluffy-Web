import Image from 'next/image';
import Link from 'next/link';
import { AlertCircle, Share } from 'lucide-react';
import { type Post as PostType } from '@/types/post';
import { MOCK_LOST_POSTS } from '@/constants/post';

export function Post({
  id,
  type,
  image,
  is_lost,
  timeAgo = '2 hours ago',
  reports = 0,
}: PostType) {
  const lost = MOCK_LOST_POSTS.find((lp) => lp.post_Id === id);
  const petName = lost?.name ?? 'Unknown Pet';
  const bounty = lost?.bounty;

  const title = is_lost ? `${petName}!` : `${petName}`;
  const tag = is_lost ? `Lost ${type}` : `Found ${type}`;
  const href = is_lost ? `/post/lost/${id}` : `/post/found/${id}`;

  return (
    <div className='bg-white'>
      {/* Header */}
      <div className='mb-2 flex items-center justify-between'>
        <div className='text-sm text-gray-500'>{timeAgo}</div>
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
        {bounty && is_lost ? (
          <span className='inline-block rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white'>
            ${bounty} Reward
          </span>
        ) : null}
      </div>

      {/* Image */}
      <div className='mb-4'>
        <Link href={href} className='block'>
          <div className='relative h-64 w-full overflow-hidden rounded-lg bg-gray-200'>
            <Image src={image} alt={title} fill className='object-cover' />
          </div>
        </Link>
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-1'>
          <AlertCircle className='h-5 w-5 text-gray-400' />
          <span className='text-sm text-gray-500'>{reports}</span>
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
