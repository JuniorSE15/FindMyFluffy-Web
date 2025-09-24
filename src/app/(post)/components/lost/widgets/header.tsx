import Image from 'next/image';
import { AlertCircle, Share } from 'lucide-react';
import { type Post } from '@/types/post';

type Props = { post: Post };

export function LostHeader({ post }: Props) {
  const title = 'Help me find my cat!';
  const tag = 'Lost';
  return (
    <div className='bg-white'>
      <div className='px-4 pt-4 text-sm text-gray-500'>15 hours ago</div>
      <h1 className='px-4 pb-2 text-xl font-semibold text-gray-900'>{title}</h1>
      <div className='px-4 pb-3'>
        <span className='inline-block rounded-full bg-orange-500 px-3 py-1 text-sm font-medium text-white'>
          {tag}
        </span>
      </div>

      <div className='mb-2 px-4'>
        <div className='relative h-56 w-full overflow-hidden rounded-lg bg-gray-200'>
          <Image src={post.image} alt={title} fill className='object-cover' />
        </div>
      </div>

      <div className='px-4 pb-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1'>
            <AlertCircle className='h-5 w-5 text-gray-400' />
            <span className='text-sm text-gray-500'>{post.reports ?? 0}</span>
          </div>
          <Share className='h-5 w-5 text-gray-400' />
        </div>
      </div>
      <div className='h-2 w-full bg-[#F8F7F4]' />
    </div>
  );
}
