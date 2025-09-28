import { MapPin, Clock } from 'lucide-react';
import { type LostPost, type Post } from '@/types/post';

type Props = { post: Post; lost?: LostPost };

export function LostDetail({ post, lost }: Props) {
  return (
    <div className='bg-white px-4 py-3'>
      <div className='mb-1 text-base font-semibold text-gray-900'>Felix</div>
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
      {lost?.bounty ? (
        <div className='rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700'>
          ${lost.bounty} reward for safe return
        </div>
      ) : null}
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
