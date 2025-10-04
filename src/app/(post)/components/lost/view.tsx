'use client';

import { LostHeader } from './widgets/header';
import { LostDetail } from './widgets/detail';
import { LostDescription } from './widgets/description';
import { LostCharacteristics } from './widgets/characteristics';
import { LostReportedSightings } from './widgets/reported-sightings';
import { LostLocation } from './widgets/location';
import { LostContact } from './widgets/contact';
import { LostFooter } from './widgets/footer';
import { useInfiniteLostPosts } from '@/hooks/useInfinitePost';
import { PostSkeleton } from '../loading/post-skeleton';

type LostPostViewProps = {
  postId: string;
};

export function LostPostView({ postId }: LostPostViewProps) {
  const { postQueryById, isLoadingPostById, errorPostById } =
    useInfiniteLostPosts({
      postId: postId,
    });

  if (isLoadingPostById) {
    return <PostSkeleton />;
  }

  if (errorPostById) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Error: {errorPostById.message}</p>
      </div>
    );
  }

  if (!postQueryById) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <div className='mx-auto'>
        <LostHeader post={postQueryById} />
        <LostDetail post={postQueryById} />
        <LostDescription description={postQueryById.description} />
        <LostCharacteristics post={postQueryById} />
        <LostReportedSightings />
        <LostLocation />
        <LostContact />
        <LostFooter />
      </div>
    </div>
  );
}
