'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { rewardType } from '@/types/reward';
import { ArrowLeft, Gift } from 'lucide-react';
import { fetchRewardById } from '@/constants/reward';
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

export default function RewardDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [reward, setReward] = useState<rewardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(2450);
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);

  const rewardId = params.reward_id as string;

  useEffect(() => {
    const loadReward = async () => {
      try {
        setLoading(true);
        const data = await fetchRewardById(rewardId);
        setReward(data);
      } catch (error) {
        console.error('Failed to fetch reward:', error);
      } finally {
        setLoading(false);
      }
    };

    if (rewardId) {
      loadReward();
    }
  }, [rewardId]);

  const handleRedeemClick = () => {
    if (reward && userPoints >= reward.points && reward.stock > 0) {
      setShowRedeemDialog(true);
    } else {
      toast('Not enough points to redeem this reward!');
    }
  };

  const handleConfirmRedeem = () => {
    if (reward && userPoints >= reward.points) {
      // Simulate redemption
      toast(`Successfully redeemed: ${reward.name}!`);
      setUserPoints((prev) => prev - reward.points);
      setShowRedeemDialog(false);
    }
  };

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-gray-500'>Loading reward details...</div>
      </div>
    );
  }

  if (!reward) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-gray-500'>Reward not found</div>
      </div>
    );
  }

  const canRedeem = userPoints >= reward.points && reward.stock > 0;

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

            <div className='bg-primary-bg flex items-center gap-2 rounded-lg px-4 py-2'>
              <div className='text-sm font-medium text-white'>Your Points:</div>
              <div className='text-lg font-bold text-white'>
                {userPoints.toLocaleString()}
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
                {reward.name}
              </h1>

              <div className='mb-4 flex items-center gap-6'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium text-gray-500'>
                    Points Required:
                  </span>
                  <span className='bg-primary-bg rounded-full px-3 py-1 text-sm font-bold text-white'>
                    {reward.points.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className='mb-3 text-xl font-semibold text-gray-900'>
                Description
              </h2>
              <p className='leading-relaxed text-gray-700'>
                {reward.description}
              </p>
            </div>

            {!canRedeem && userPoints < reward.points && (
              <div className='bg-primary-bg rounded-lg p-4'>
                <p className='text-orange-800'>
                  <span className='font-medium'>
                    You need {(reward.points - userPoints).toLocaleString()}{' '}
                    more points
                  </span>{' '}
                  to redeem this reward.
                </p>
              </div>
            )}

            {reward.stock === 0 && (
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
                  : reward.stock === 0
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
