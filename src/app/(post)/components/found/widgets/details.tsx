import { MapPin, Clock } from 'lucide-react';
import { FoundPetPostResponse } from '@/types/post';
import { GetLocation } from '../../location/get-location';
import { formatDate } from '@/utils/date';

type Props = { post: FoundPetPostResponse };

export function FoundDetail({ post }: Props) {
  return (
    <div className='bg-white px-4 py-3'>
      <div className='mb-1 text-base font-semibold text-gray-900'>
        {/* Could be pet name if you want */}
        {post.name}
      </div>

      <div className='mb-3 text-sm text-gray-500'>
        <div className='flex items-center gap-1'>
          <MapPin className='h-4 w-4' />
          <span className='flex-1'>
            <GetLocation latitude={post.latitude} longitude={post.longitude} />
          </span>
        </div>
        <div className='mt-1 flex items-center gap-1'>
          <Clock className='h-4 w-4' />
          <span>{formatDate(post.postDatetime)}</span>
        </div>
      </div>

      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
