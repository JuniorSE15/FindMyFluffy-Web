'use client';

import { ProfilePostNavBar } from '../components/profile-post-bar';
import { ProfileSection } from '../components/profile-section';
import { TopNavigationBarProfile } from '../components/top-bar';
import { BottomNavigationBar } from '@/components/navigation/bottom-navigation-bar';
import { useState, useEffect } from 'react';
import { getSessionAction } from '@/services/auth.service';
import { MOCK_FEED_POSTS } from '@/constants/post';
import { Post } from '@/components/post/post';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const posts = MOCK_FEED_POSTS.filter((p) =>
    activeTab === 'lost' ? p.is_lost : !p.is_lost,
  );

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSessionAction();
        if (session) {
          setUsername(session.userName);
          setEmail(session.email);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, []);

  // todo: fetch user profile data and posts from backend

  return (
    <div className='relative flex h-screen flex-col'>
      <div className='sticky top-0 left-0 z-50 w-full'>
        <TopNavigationBarProfile />
      </div>
      <main className='flex flex-1 flex-col overflow-hidden'>
        <ProfileSection
          username={username || 'Username'}
          email={email || 'Email'}
          profilePictureUrl='https://i.sstatic.net/frlIf.png'
          socialCredits={0}
          creditsEarned={0}
        />
        <ProfilePostNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className='flex-1 space-y-4 overflow-y-auto scroll-smooth p-4'>
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
