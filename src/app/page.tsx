'use client';

import { useState } from 'react';
import { BottomNavigationBar } from '@/components/navigation/bottom-navigation-bar';
import { TopNavigationBar } from '@/components/navigation/top-navigation-bar';
import { Post } from '@/components/post/post';
import { MOCK_FEED_POSTS } from '@/constants/post';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');

  const posts = MOCK_FEED_POSTS.filter((p) =>
    activeTab === 'lost' ? p.is_lost : !p.is_lost,
  );

  return (
    <div className='relative flex h-full flex-col'>
      <div className='sticky top-0 left-0 z-50 w-full'>
        <TopNavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <main className='flex-1 overflow-hidden'>
        <div className='h-full space-y-4 overflow-y-auto scroll-smooth p-4'>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </main>
      <div className='sticky bottom-0 left-0 z-50 w-full'>
        <BottomNavigationBar />
      </div>
    </div>
  );
}
