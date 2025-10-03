'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RewardCard from '../components/reward-card';
import { rewardType } from '@/types/reward';
import { ArrowLeft } from 'lucide-react';
import { fetchRewards } from '@/constants/reward';

export default function RewardPage() {
  const router = useRouter();
  const [rewards, setRewards] = useState<rewardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(2450); // Example user points

  useEffect(() => {
    const loadRewards = async () => {
      try {
        setLoading(true);
        const data = await fetchRewards();
        setRewards(data);
      } catch (error) {
        console.error('Failed to fetch rewards:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRewards();
  }, []);

  return (
    <div className='relative flex h-screen flex-col'>
      <main className='flex flex-1 flex-col overflow-hidden'>
        <div className='sticky top-0 z-40 bg-white shadow-sm'>
          <div className='mx-auto max-w-4xl p-4'>
            <div className='flex items-center justify-between'>
              <button
                onClick={() => router.back()}
                className='flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900'
              >
                <ArrowLeft className='h-5 w-5' />
                <span className='font-medium'>Back</span>
              </button>

              <div className='bg-primary-bg flex items-center gap-2 rounded-lg px-4 py-2'>
                <div className='text-sm font-medium text-white'>
                  Your Points:
                </div>
                <div className='text-lg font-bold text-white'>
                  {userPoints.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex-1 overflow-y-auto scroll-smooth p-4'>
          <div className='mx-auto max-w-4xl space-y-4'>
            {loading ? (
              <div className='flex items-center justify-center py-12'>
                <div className='text-gray-500'>Loading rewards...</div>
              </div>
            ) : (
              rewards.map((reward) => (
                <RewardCard key={reward.id} reward={reward} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
