'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RewardCard from '../components/reward-card';
import { ArrowLeft, CoinsIcon, Gift, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { useReward } from '@/hooks/useReward';
import { Skeleton } from '@/components/ui/skeleton';

export default function RewardPage() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  const { rewards, isRewardsLoading, isRewardsError } = useReward();

  return (
    <div className='relative flex h-screen flex-col'>
      <main className='flex flex-1 flex-col overflow-hidden'>
        <div className='sticky top-0 z-40 bg-white shadow-sm'>
          <div className='mx-auto max-w-4xl p-4'>
            {/* Desktop layout */}
            <div className='hidden items-center justify-between md:flex'>
              <button
                onClick={() => router.back()}
                className='flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900'
              >
                <ArrowLeft className='h-5 w-5' />
                <span className='font-medium'>Back</span>
              </button>

              <div className='flex items-center gap-2'>
                <div className='bg-primary-bg flex items-center justify-center gap-2 rounded-lg px-4 py-2'>
                  <div className='text-sm font-medium text-white'>
                    Your Points:
                  </div>
                  <div className='text-sm font-bold text-white'>
                    {isUserLoading ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      user?.point?.toString().toLocaleString() || '0'
                    )}
                  </div>
                </div>
                <Link href='/topup'>
                  <Button
                    variant='outline'
                    size='lg'
                    className='flex items-center gap-2 rounded-lg px-4 py-2'
                  >
                    <CoinsIcon className='h-4 w-4' />
                    Top-up
                  </Button>
                </Link>
                <Link href='/reward/redeemed'>
                  <Button
                    variant='outline'
                    size='lg'
                    className='flex items-center gap-2 rounded-lg px-4 py-2'
                  >
                    <Gift className='h-4 w-4' />
                    My Rewards
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile layout */}
            <div className='space-y-3 md:hidden'>
              {/* Top row: Back button and Points */}
              <div className='flex items-center justify-between'>
                <button
                  onClick={() => router.back()}
                  className='flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900'
                >
                  <ArrowLeft className='h-4 w-4' />
                  <span className='text-sm font-medium'>Back</span>
                </button>

                <div className='bg-primary-bg flex items-center gap-2 rounded-lg px-3 py-2'>
                  <div className='text-xs font-medium text-white'>Points:</div>
                  <div className='text-xs font-bold text-white'>
                    {isUserLoading ? (
                      <Loader2 className='h-3 w-3 animate-spin' />
                    ) : (
                      user?.point?.toString().toLocaleString() || '0'
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom row: Action buttons */}
              <div className='flex items-center gap-2'>
                <Link href='/topup' className='flex-1'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex w-full items-center justify-center gap-1 rounded-lg px-2 py-2'
                  >
                    <CoinsIcon className='h-3 w-3' />
                    <span className='text-xs'>Top-up</span>
                  </Button>
                </Link>
                <Link href='/reward/redeemed' className='flex-1'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex w-full items-center justify-center gap-1 rounded-lg px-2 py-2'
                  >
                    <Gift className='h-3 w-3' />
                    <span className='text-xs'>My Rewards</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='flex-1 overflow-y-auto scroll-smooth p-4'>
          <div className='mx-auto max-w-4xl space-y-4'>
            {isRewardsLoading ? (
              <div className='justify-cente flex h-screen flex-col items-center space-y-4'>
                <Skeleton className='h-32 w-full rounded-lg' />
                <Skeleton className='h-32 w-full rounded-lg' />
                <Skeleton className='h-32 w-full rounded-lg' />
                <Skeleton className='h-32 w-full rounded-lg' />
                <Skeleton className='h-32 w-full rounded-lg' />
              </div>
            ) : isRewardsError ? (
              <div className='flex h-screen items-center justify-center'>
                <div className='text-gray-500'>Error loading rewards</div>
              </div>
            ) : (
              rewards &&
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
