'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Gift, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useReward } from '@/hooks/useReward';
import { useUser } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';

export default function RewardDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);

  const { rewardQueryById, isRewardQueryByIdLoading, rewardRedeemMutation } =
    useReward({ rewardId: params.reward_id as string });
  const { user, isLoading: isUserLoading } = useUser();
  const userPoints = user?.point || 0;

  const handleRedeemClick = () => {
    if (
      rewardQueryById &&
      userPoints >= rewardQueryById.point &&
      rewardQueryById.stock > 0
    ) {
      setShowRedeemDialog(true);
    } else {
      toast('Not enough points to redeem this reward!');
    }
  };

  const handleConfirmRedeem = () => {
    if (rewardQueryById && userPoints >= rewardQueryById.point) {
      rewardRedeemMutation.mutate({
        rewardId: rewardQueryById.id,
        amount: 1,
      });

      if (rewardRedeemMutation.isSuccess) {
        setShowRedeemDialog(false);
      }
    }
  };

  if (isRewardQueryByIdLoading) {
    return (
      <div className='relative flex h-screen flex-col'>
        {/* Header Skeleton */}
        <div className='sticky top-0 z-40 bg-white shadow-sm'>
          <div className='mx-auto max-w-4xl p-4'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-10 w-20' />
              <Skeleton className='h-10 w-32' />
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <main className='flex-1 overflow-y-auto'>
          <div className='mx-auto max-w-4xl p-4'>
            {/* Image Skeleton */}
            <div className='mb-6 flex justify-center'>
              <Skeleton className='h-64 w-full max-w-md rounded-xl' />
            </div>

            {/* Content Skeleton */}
            <div className='mb-20 space-y-6'>
              <div>
                <Skeleton className='mb-2 h-8 w-3/4' />
                <Skeleton className='h-6 w-1/3' />
              </div>

              <div>
                <Skeleton className='mb-3 h-6 w-1/4' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-4/6' />
              </div>
            </div>
          </div>
        </main>

        {/* Button Skeleton */}
        <div className='sticky bottom-0 z-40 border-t border-gray-200 bg-white shadow-lg'>
          <div className='mx-auto max-w-4xl p-4'>
            <Skeleton className='h-14 w-full rounded-lg' />
          </div>
        </div>
      </div>
    );
  }

  if (!rewardQueryById) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-gray-500'>Reward not found</div>
      </div>
    );
  }

  const canRedeem =
    userPoints >= rewardQueryById.point && rewardQueryById.stock > 0;

  return (
    <div className='relative flex h-screen flex-col'>
      {/* Header */}
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

            <div className='bg-primary-bg flex items-center justify-center gap-2 rounded-lg px-4 py-2'>
              <div className='text-sm font-medium text-white'>Your Points:</div>
              <div className='text-sm font-bold text-white'>
                {isUserLoading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  user?.point?.toString().toLocaleString() || '0'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto'>
        <div className='mx-auto max-w-4xl p-4'>
          {/* Image Placeholder */}
          <div className='mb-6 flex justify-center'>
            <div className='flex h-64 w-full max-w-md items-center justify-center rounded-xl bg-gray-200'>
              <Gift className='h-24 w-24 text-gray-400' />
            </div>
          </div>

          {/* Reward Details */}
          <div className='mb-20 space-y-6'>
            <div>
              <h1 className='mb-2 text-3xl font-bold text-gray-900'>
                {rewardQueryById.name}
              </h1>

              <div className='mb-4 flex items-center gap-6'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium text-gray-500'>
                    Points Required:
                  </span>
                  <span className='bg-primary-bg rounded-full px-3 py-1 text-sm font-bold text-white'>
                    {isUserLoading ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      rewardQueryById.point?.toString().toLocaleString() || '0'
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className='mb-3 text-xl font-semibold text-gray-900'>
                Description
              </h2>
              <p className='leading-relaxed text-gray-700'>
                {rewardQueryById.description}
              </p>
            </div>

            {!canRedeem && userPoints < rewardQueryById.point && (
              <div className='bg-primary-bg rounded-lg p-4'>
                <p className='text-orange-800'>
                  <span className='font-medium'>
                    You need{' '}
                    {(rewardQueryById.point - userPoints).toLocaleString()} more
                    points
                  </span>{' '}
                  to redeem this reward.
                </p>
              </div>
            )}

            {rewardQueryById.stock === 0 && (
              <div className='rounded-lg bg-red-50 p-4'>
                <p className='font-medium text-red-800'>
                  This reward is currently out of stock.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Redeem Button */}
      <div className='sticky bottom-0 z-40 border-t border-gray-200 bg-white shadow-lg'>
        <div className='mx-auto max-w-4xl p-4'>
          <AlertDialog
            open={showRedeemDialog}
            onOpenChange={setShowRedeemDialog}
          >
            <AlertDialogTrigger asChild>
              <button
                onClick={handleRedeemClick}
                disabled={!canRedeem}
                className={`w-full rounded-lg px-6 py-4 font-semibold text-white transition-colors ${
                  canRedeem
                    ? 'bg-primary-bg hover:opacity-90 active:opacity-95'
                    : 'cursor-not-allowed bg-gray-400'
                }`}
              >
                {canRedeem
                  ? 'Redeem'
                  : rewardQueryById.stock === 0
                    ? 'Out of Stock'
                    : 'Not Enough Points'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Redemption</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to redeem?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmRedeem}
                  className='bg-primary-bg hover:bg-primary-bg/90'
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
