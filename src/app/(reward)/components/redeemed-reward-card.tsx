import { Card } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { RedeemedReward } from '@/types/reward.d';
import { format } from 'date-fns';

export default function RedeemedRewardCard({
  redeemedReward,
}: {
  redeemedReward: RedeemedReward;
}) {
  return (
    <Card className='mb-4 w-full p-4 transition-shadow hover:shadow-lg'>
      <div className='flex gap-4'>
        {/* Image Placeholder */}
        <div className='flex-shrink-0'>
          <div className='flex h-20 w-20 items-center justify-center rounded-lg bg-gray-200'>
            <Gift className='h-8 w-8 text-gray-400' />
          </div>
        </div>
        {/* Content */}
        <div className='min-w-0 flex-1'>
          <div className='mb-2 flex items-center justify-between'>
            <h3 className='truncate text-lg font-semibold text-gray-900'>
              {redeemedReward.rewardName}
            </h3>
          </div>
          <div className='flex flex-wrap gap-4 text-sm'>
            <div>
              <span className='text-gray-500'>Quantity:</span>
              <span className='text-primary-bg ml-1 font-medium'>
                {redeemedReward.amount}
              </span>
            </div>
            <div>
              <span className='text-gray-500'>Redeemed:</span>
              <span className='ml-1 font-medium text-gray-700'>
                {format(new Date(redeemedReward.redeemedAt), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
