import { Skeleton } from '../ui/skeleton';

// Individual Post Card Skeleton
function PostCardSkeleton() {
  return (
    <div className='bg-white'>
      {/* Header */}
      <div className='mb-2 flex items-center justify-between'>
        <Skeleton className='h-4 w-20' />
      </div>

      {/* Title */}
      <div className='mb-2'>
        <Skeleton className='h-6 w-2/3' />
      </div>

      {/* Tags */}
      <div className='mb-4 flex items-center gap-2'>
        <Skeleton className='h-6 w-20 rounded-full' />
        <Skeleton className='h-6 w-24 rounded-full' />
      </div>

      {/* Image */}
      <div className='mb-4'>
        <Skeleton className='h-64 w-full rounded-lg' />
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-1'>
          <Skeleton className='h-5 w-5 rounded-full' />
          <Skeleton className='h-4 w-4' />
        </div>
        <Skeleton className='h-5 w-5 rounded-full' />
      </div>

      {/* Separator */}
      <div className='mt-4 border-t border-gray-200'></div>
    </div>
  );
}

export function PostsSkeleton() {
  return (
    <div className='mx-auto space-y-4'>
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  );
}
