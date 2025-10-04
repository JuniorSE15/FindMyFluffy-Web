'use client';

import { FoundHeader } from './widgets/header';
import { FoundDetail } from './widgets/details';
import { FoundDescription } from './widgets/description';
import { FoundCharacteristics } from './widgets/characteristics';
import { FoundLocation } from './widgets/location';
import { FoundContact } from './widgets/contact';
import { useInfiniteFoundPosts } from '@/hooks/useInfinitePost';
import { PostSkeleton } from '../loading/post-skeleton';

type FoundPostViewProps = {
  postId: string;
};

export function FoundPostView({ postId }: FoundPostViewProps) {
  const { postQueryById, isLoadingPostById, errorPostById } =
    useInfiniteFoundPosts({
      postId: postId,
    });

  if (isLoadingPostById) {
    return <PostSkeleton />;
  }

  if (!postQueryById) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Post not found</p>
      </div>
    );
  }

  if (errorPostById) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Error: {errorPostById.message}</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#F8F7F4]'>
      <div className='mx-auto'>
        <FoundHeader post={postQueryById} /> {/* safe to reuse */}
        <FoundDetail post={postQueryById} />
        <FoundDescription description={postQueryById.description} />
        <FoundCharacteristics post={postQueryById} />
        <FoundLocation
          latitude={postQueryById.latitude}
          longitude={postQueryById.longitude}
        />
        <FoundContact />
      </div>
    </div>
  );
}
