'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RedeemedRewardCard from '../../components/redeemed-reward-card';
import { ArrowLeft, Loader2, Gift, CoinsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { useUserRewards } from '@/hooks/useUserRewards';
import { Skeleton } from '@/components/ui/skeleton';

export default function RedeemedRewardsPage() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  const { userRewards, isUserRewardsLoading, isUserRewardsError } =
    useUserRewards();

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
                    className='flex h-full w-full items-center gap-2 rounded-lg px-4 py-2'
                  >
                    <CoinsIcon className='h-4 w-4' />
                    Top-up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='flex-1 overflow-y-auto scroll-smooth p-4'>
          <div className='mx-auto max-w-4xl space-y-4'>
            {isUserRewardsLoading ? (
              <div className='justify-cente flex h-screen flex-col items-center space-y-4'>
                <Skeleton className='h-32 w-full rounded-lg' />
                <Skeleton className='h-32 w-full rounded-lg' />
                <Skeleton className='h-32 w-full rounded-lg' />
                <Skeleton className='h-32 w-full rounded-lg' />
                <Skeleton className='h-32 w-full rounded-lg' />
              </div>
            ) : isUserRewardsError ? (
              <div className='flex h-screen items-center justify-center'>
                <div className='text-gray-500'>
                  Error loading redeemed rewards
                </div>
              </div>
            ) : userRewards && userRewards.length > 0 ? (
              userRewards.map((redeemedReward) => (
                <RedeemedRewardCard
                  key={redeemedReward.id}
                  redeemedReward={redeemedReward}
                />
              ))
            ) : (
              <div className='flex h-screen flex-col items-center justify-center space-y-4'>
                <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-100'>
                  <Gift className='h-10 w-10 text-gray-400' />
                </div>
                <div className='text-center'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    No Redeemed Rewards
                  </h3>
                  <p className='text-gray-500'>
                    You haven&apos;t redeemed any rewards yet.
                  </p>
                </div>
                <Link href='/reward'>
                  <Button className='mt-4'>Browse Rewards</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
