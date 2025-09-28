import { PawPrint, BadgePercent, Venus } from 'lucide-react';
import { type Post } from '@/types/post';

type Props = { post: Post };

export function FoundCharacteristics({ post }: Props) {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='mb-3 text-sm font-medium text-gray-900'>
        Characteristics
      </div>

      <div className='grid grid-cols-2 gap-6 text-sm'>
        <div>
          <div className='mb-1 flex items-center gap-2 text-gray-600'>
            <PawPrint className='h-4 w-4 text-orange-500' />
            <span className='capitalize'>Type</span>
          </div>
          <div className='font-semibold text-gray-900 capitalize'>
            {post.type}
          </div>
        </div>

        <div>
          <div className='mb-1 flex items-center gap-2 text-gray-600'>
            <BadgePercent className='h-4 w-4 text-orange-500' />
            <span>Breed</span>
          </div>
          <div className='font-semibold text-gray-900'>{post.breed ?? '—'}</div>
        </div>
      </div>

      <div className='my-4 h-px w-full bg-gray-200' />

      <div className='grid grid-cols-2 gap-6 text-sm'>
        <div>
          <div className='mb-1 flex items-center gap-2 text-gray-600'>
            <Venus className='h-4 w-4 text-orange-500' />
            <span>Gender</span>
          </div>
          <div className='font-semibold text-gray-900 capitalize'>
            {post.gender}
          </div>
        </div>
      </div>
    </div>
  );
}
