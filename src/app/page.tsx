'use client';

import { useState } from 'react';
import { BottomNavigationBar } from '@/components/navigation/bottom-navigation-bar';
import { TopNavigationBar } from '@/components/navigation/top-navigation-bar';
import { Post } from '@/components/post/post';
import { useFoundPosts, useLostPosts } from '@/hooks/usePost';
import { Button } from '@/components/ui/button';
import { PostsSkeleton } from '@/components/post/posts-skeleton';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');

  const { posts: lostPosts, isLoading: lostPostsLoading } = useLostPosts({
    isLost: activeTab === 'lost',
  });
  const { posts: foundPosts, isLoading: foundPostsLoading } = useFoundPosts({
    isLost: activeTab === 'found',
  });

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
                <Button variant='outline' size='sm'>
                  {activeTab === 'lost'
                    ? 'Load more lost posts'
                    : 'Load more found posts'}
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
