import { MapPin, Clock } from 'lucide-react';
import { LostPetPostResponse } from '@/types/post';
import { formatDate } from '@/utils/date';
import { GetLocation } from '../../location/get-location';

type Props = { post: LostPetPostResponse };

export function LostDetail({ post }: Props) {
  return (
    <div className='bg-white px-4 py-3'>
      <div className='mb-1 text-base font-semibold text-gray-900'>
        {post.name}
      </div>
      <div className='mb-3 text-sm text-gray-500'>
        <div className='flex flex-1 items-center gap-1'>
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
      {post.bounty ? (
        <div className='rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700'>
          ${post.bounty} reward for safe return
        </div>
      ) : null}
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
