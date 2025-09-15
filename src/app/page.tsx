'use client';

import { BottomNavigationBar } from '@/components/navigation/bottom-navigation-bar';
import { TopNavigationBar } from '@/components/navigation/top-navigation-bar';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center'>
      <div className='sticky top-0 left-0 z-50 w-full'>
        <TopNavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className='flex-1'>
        <h1>Find My Fluffy</h1>
      </div>
      <div className='sticky bottom-0 left-0 z-50 w-full'>
        <BottomNavigationBar />
      </div>
    </div>
  );
}
