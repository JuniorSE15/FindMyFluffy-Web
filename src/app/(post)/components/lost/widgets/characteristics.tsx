import { type Post } from '@/types/post';
import { PawPrint, BadgePercent, LucideUser } from 'lucide-react';

type Props = { post: Post };

export function LostCharacteristics({ post }: Props) {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='mb-3 text-sm font-medium text-gray-900'>
        Characteristics
      </div>
      <div className='grid grid-cols-2 gap-3 text-sm'>
        <div className='flex items-center justify-between rounded-md border border-gray-200 p-3'>
          <div className='flex items-center gap-2 text-gray-600'>
            <PawPrint className='h-4 w-4' />
            <span>Type</span>
          </div>
          <div className='font-medium text-gray-900 capitalize'>
            {post.type}
          </div>
        </div>
        <div className='flex items-center justify-between rounded-md border border-gray-200 p-3'>
          <div className='flex items-center gap-2 text-gray-600'>
            <BadgePercent className='h-4 w-4' />
            <span>Breed</span>
          </div>
          <div className='font-medium text-gray-900'>{post.breed ?? '—'}</div>
        </div>
        <div className='flex items-center justify-between rounded-md border border-gray-200 p-3'>
          <div className='flex items-center gap-2 text-gray-600'>
            <LucideUser className='h-4 w-4' />
            <span>Gender</span>
          </div>
          <div className='font-medium text-gray-900 capitalize'>
            {post.gender}
          </div>
        </div>
        <div className='flex items-center justify-between rounded-md border border-gray-200 p-3'>
          <div className='flex items-center gap-2 text-gray-600'>
            <LucideUser className='h-4 w-4' />
            <span>Age</span>
          </div>
          <div className='font-medium text-gray-900'>18</div>
        </div>
      </div>
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
