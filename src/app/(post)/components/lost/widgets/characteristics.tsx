import { genderMap, LostPetPostResponse } from '@/types/post';
import { PawPrint, BadgePercent, Hourglass, Venus, Cpu } from 'lucide-react';

type Props = { post: LostPetPostResponse };

export function LostCharacteristics({ post }: Props) {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='mb-3 text-sm font-medium text-gray-900'>
        Characteristics
      </div>

      {/* Row 1 */}
      <div className='grid grid-cols-2 gap-6 text-sm'>
        <div>
          <div className='mb-1 flex items-center gap-2 text-gray-600'>
            <PawPrint className='h-4 w-4 text-orange-500' />
            <span className='capitalize'>type</span>
          </div>
          <div className='font-semibold text-gray-900 capitalize'>
            {post.type}
          </div>
        </div>
        <div>
          <div className='mb-1 flex items-center gap-2 text-gray-600'>
            <Hourglass className='h-4 w-4 text-orange-500' />
            <span>Age</span>
          </div>
          <div className='font-semibold text-gray-900'>18</div>
        </div>
      </div>

      <div className='my-4 h-px w-full bg-gray-200' />

      {/* Row 2 */}
      <div className='grid grid-cols-2 gap-6 text-sm'>
        <div>
          <div className='mb-1 flex items-center gap-2 text-gray-600'>
            <BadgePercent className='h-4 w-4 text-orange-500' />
            <span>Breed</span>
          </div>
          <div className='font-semibold text-gray-900'>{post.breed ?? '—'}</div>
        </div>
        <div>
          <div className='mb-1 flex items-center gap-2 text-gray-600'>
            <Venus className='h-4 w-4 text-orange-500' />
            <span>Gender</span>
          </div>
          <div className='font-semibold text-gray-900 capitalize'>
            {genderMap[post.gender]}
          </div>
        </div>
      </div>

      <div className='mt-4 h-px w-full bg-gray-200' />

      {/* Row 3 */}
      <div className='mt-4 grid grid-cols-2 gap-6 text-sm'>
        <div>
          <div className='mb-1 flex items-center gap-2 text-gray-600'>
            <Cpu className='h-4 w-4 text-orange-500' />
            <span>Microchip ID</span>
          </div>
          <div className='font-semibold text-gray-900'>
            {post.microchip ?? ''}
          </div>
        </div>
      </div>
    </div>
  );
}
