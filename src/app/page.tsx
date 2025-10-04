'use client';

import { useState } from 'react';
import { BottomNavigationBar } from '@/components/navigation/bottom-navigation-bar';
import { TopNavigationBar } from '@/components/navigation/top-navigation-bar';
import { Post } from '@/components/post/post';
import {
  useInfiniteFoundPosts,
  useInfiniteLostPosts,
} from '@/hooks/useInfinitePost';
import { Button } from '@/components/ui/button';
import { PostsSkeleton } from '@/components/post/posts-skeleton';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const TAKE = 10;

  const {
    posts: lostPosts,
    isLoading: lostPostsLoading,
    isFetchingNextPage: isFetchingNextLostPage,
    hasNextPage: hasNextLostPage,
    fetchNextPage: fetchNextLostPage,
  } = useInfiniteLostPosts({
    isLost: activeTab === 'lost',
    take: TAKE,
  });

  const {
    posts: foundPosts,
    isLoading: foundPostsLoading,
    isFetchingNextPage: isFetchingNextFoundPage,
    hasNextPage: hasNextFoundPage,
    fetchNextPage: fetchNextFoundPage,
  } = useInfiniteFoundPosts({
    isLost: activeTab === 'lost',
    take: TAKE,
  });

  const handleLoadMore = () => {
    if (activeTab === 'lost') {
      fetchNextLostPage();
    } else {
      fetchNextFoundPage();
    }
  };

  return (
    <div className='relative flex h-screen flex-col'>
      <div className='sticky top-0 left-0 z-50 w-full'>
        <TopNavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <main className='flex-1 overflow-hidden'>
        <div className='h-full space-y-4 overflow-y-auto scroll-smooth p-4'>
          {lostPostsLoading || foundPostsLoading ? (
            <PostsSkeleton />
          ) : activeTab === 'lost' ? (
            lostPosts?.map((post) => <Post key={post.id} {...post} />)
          ) : (
            foundPosts?.map((post) => <Post key={post.id} {...post} />)
          )}
          {lostPosts?.length || foundPosts?.length ? (
            <div className='h-10'>
              <div className='flex h-full w-full items-center justify-center'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleLoadMore}
                  disabled={
                    activeTab === 'lost'
                      ? isFetchingNextLostPage || !hasNextLostPage
                      : isFetchingNextFoundPage || !hasNextFoundPage
                  }
                >
                  {activeTab === 'lost' ? (
                    isFetchingNextLostPage ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : hasNextLostPage ? (
                      'Load more lost posts'
                    ) : (
                      'No more lost posts'
                    )
                  ) : isFetchingNextFoundPage ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : hasNextFoundPage ? (
                    'Load more found posts'
                  ) : (
                    'No more found posts'
                  )}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </main>
      <div className='sticky bottom-0 left-0 z-50 w-full'>
        <BottomNavigationBar />
      </div>
    </div>
  );
}
