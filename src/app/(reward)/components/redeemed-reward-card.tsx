import { Card } from '@/components/ui/card';
import { Gift, CheckCircle, Clock, XCircle } from 'lucide-react';
import { RedeemedReward } from '@/types/reward.d';
import { format } from 'date-fns';

export default function RedeemedRewardCard({
  redeemedReward,
}: {
  redeemedReward: RedeemedReward;
}) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='h-4 w-4 text-green-500' />;
      case 'pending':
        return <Clock className='h-4 w-4 text-yellow-500' />;
      case 'cancelled':
        return <XCircle className='h-4 w-4 text-red-500' />;
      default:
        return <Clock className='h-4 w-4 text-gray-500' />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

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
              {redeemedReward.reward.name}
            </h3>
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(redeemedReward.status)}`}
            >
              {getStatusIcon(redeemedReward.status)}
              <span className='capitalize'>{redeemedReward.status}</span>
            </div>
          </div>

          <p className='mb-3 line-clamp-2 text-sm text-gray-600'>
            {redeemedReward.reward.description}
          </p>

          <div className='flex flex-wrap gap-4 text-sm'>
            <div>
              <span className='text-gray-500'>Points Used:</span>
              <span className='text-primary-bg ml-1 font-medium'>
                {redeemedReward.reward.point * redeemedReward.amount}
              </span>
            </div>
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
