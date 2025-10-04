'use client';

import { ProfilePostNavBar } from '../components/profile-post-bar';
import { ProfileSection } from '../components/profile-section';
import { TopNavigationBarProfile } from '../components/top-bar';
import { BottomNavigationBar } from '@/components/navigation/bottom-navigation-bar';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Post } from '@/components/post/post';
import { useUserLostPosts, useUserFoundPosts } from '@/hooks/useInfinitePost';
import { PostsSkeleton } from '@/components/post/posts-skeleton';
import { getCurrentUserAction } from '@/services/user.service';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');

  async function fetchUser() {
    const res = await getCurrentUserAction();
    return res;
  }

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const {
    posts: lostPosts,
    isLoading: lostPostsLoading,
    error: lostPostsError,
  } = useUserLostPosts(user?.id || '');

  const {
    posts: foundPosts,
    isLoading: foundPostsLoading,
    error: foundPostsError,
  } = useUserFoundPosts(user?.id || '');

  const currentPosts = activeTab === 'lost' ? lostPosts : foundPosts;
  const isLoading = lostPostsLoading || foundPostsLoading;

  return (
    <div className='relative flex h-screen flex-col'>
      <div className='sticky top-0 left-0 z-50 w-full'>
        <TopNavigationBarProfile />
      </div>
      <main className='flex flex-1 flex-col overflow-hidden'>
        <ProfileSection
          username={user?.userName || 'Username'}
          email={user?.email || 'Email'}
          profilePictureUrl='https://i.sstatic.net/frlIf.png'
          socialCredits={user?.point || 0}
          creditsEarned={user?.point || 0}
        />
        <ProfilePostNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className='flex-1 space-y-4 overflow-y-auto scroll-smooth p-4'>
          {isLoading ? (
            <PostsSkeleton />
          ) : (
            currentPosts?.map((post) => <Post key={post.id} {...post} />)
          )}
        </div>
      </main>
      <div className='sticky bottom-0 left-0 z-50 w-full'>
        <BottomNavigationBar />
      </div>
    </div>
  );
}
