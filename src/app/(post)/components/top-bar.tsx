'use client';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TopBarPostFormProps {
  onPost?: () => void;
  onClose?: () => void;
  isLoading?: boolean;
}

export const TopBarPostForm = ({
  onPost,
  onClose,
  isLoading = false,
}: TopBarPostFormProps) => {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const handlePost = () => {
    if (onPost) {
      onPost();
    } else {
      console.log('submit');
    }
  };

  return (
    <div className='flex h-16 w-full max-w-xl flex-shrink-0 items-center justify-between bg-white px-2 py-2 shadow-sm'>
      {/* Cross button on the left */}
      <Button
        variant='ghost'
        size='sm'
        onClick={handleClose}
        className='h-10 w-10 p-0'
        disabled={isLoading}
      >
        <X className='h-5 w-5' />
      </Button>

      {/* Post button on the right */}
      <Button
        onClick={handlePost}
        disabled={isLoading}
        className='bg-primary-bg hover:bg-primary-bg/90 px-6 font-medium text-white'
      >
        {isLoading ? 'Posting...' : 'Post'}
      </Button>
    </div>
  );
};
