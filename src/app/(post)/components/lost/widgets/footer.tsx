import { ReportDialog } from '../sighting/report-dialog';
import { useUser } from '@/hooks/useUser';
import { ReturnedConfirmationDialog } from './returned-confirmation-dialog';
import { usePost } from '@/hooks/usePost';
import { LostPetPostResponse } from '@/types/post';
import { CheckCircle } from 'lucide-react';

interface LostFooterProps {
  post: LostPetPostResponse;
}

export function LostFooter({ post }: LostFooterProps) {
  const { user } = useUser();
  const { markPostAsReturnedMutation } = usePost({ postId: post.postId });

  const isPostOwner = user?.id === post.userId;
  const canMarkAsReturned = isPostOwner && !post.returned;

  const handleMarkAsReturned = () => {
    markPostAsReturnedMutation.mutate(post.postId);
  };

  return (
    <div className='bg-white px-4 py-4'>
      {post.returned && (
        <div className='mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3'>
          <div className='flex items-center gap-2'>
            <CheckCircle className='h-5 w-5 text-green-600' />
            <span className='text-sm font-medium text-green-800'>
              This pet has been returned safely!
            </span>
          </div>
        </div>
      )}

      {!isPostOwner && (
        <>
          <div className='mb-2 text-sm font-medium text-gray-900'>
            Have you found this pet?
          </div>

          <ReportDialog postId={post.postId} />
        </>
      )}

      {canMarkAsReturned && (
        <div className='mt-4'>
          <ReturnedConfirmationDialog
            onConfirm={handleMarkAsReturned}
            isLoading={markPostAsReturnedMutation.isPending}
          />
        </div>
      )}
    </div>
  );
}
