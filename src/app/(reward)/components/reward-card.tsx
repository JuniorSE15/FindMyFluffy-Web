import { rewardType } from '@/types/reward';
import { Card } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RewardCard({ reward }: { reward: rewardType }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/reward/${reward.id}`);
  };
  return (
    <Card
      className='mb-4 w-full cursor-pointer p-4 transition-shadow hover:shadow-lg'
      onClick={handleClick}
    >
      <div className='flex gap-4'>
        {/* Image Placeholder */}
        <div className='flex-shrink-0'>
          <div className='flex h-20 w-20 items-center justify-center rounded-lg bg-gray-200'>
            <Gift className='h-8 w-8 text-gray-400' />
          </div>
        </div>

        {/* Content */}
        <div className='min-w-0 flex-1'>
          <h3 className='mb-2 truncate text-lg font-semibold text-gray-900'>
            {reward.name}
          </h3>

          <p className='mb-3 line-clamp-2 text-sm text-gray-600'>
            {reward.description}
          </p>

          <div className='flex gap-4'>
            <div className='text-sm'>
              <span className='text-gray-500'>Points:</span>
              <span className='text-primary-bg ml-1 font-medium'>
                {reward.points}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
