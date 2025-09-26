import { MapPin, Clock } from 'lucide-react';
import { type Post } from '@/types/post';

type Props = { post: Post };

export function FoundDetail({ post }: Props) {
  return (
    <div className='bg-white px-4 py-3'>
      <div className='mb-1 text-base font-semibold text-gray-900'>
        {/* Could be pet name if you want */}
        Found Pet
      </div>

      <div className='mb-3 text-sm text-gray-500'>
        <div className='flex items-center gap-1'>
          <MapPin className='h-4 w-4' />
          <span>Tokyo, Japan</span>
        </div>
        <div className='mt-1 flex items-center gap-1'>
          <Clock className='h-4 w-4' />
          <span>May 18, 2025 • 02:11 PM</span>
        </div>
      </div>

      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
