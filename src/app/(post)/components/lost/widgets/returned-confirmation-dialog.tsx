'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CheckCircle, Loader2Icon } from 'lucide-react';
import { useState } from 'react';

interface ReturnedConfirmationDialogProps {
  onConfirm: () => void;
  isLoading?: boolean;
}

export const ReturnedConfirmationDialog = ({
  onConfirm,
  isLoading = false,
}: ReturnedConfirmationDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='mb-2 flex w-full items-center justify-center gap-2 rounded-full bg-green-100 px-4 py-3 text-sm font-medium text-green-800 transition-colors hover:bg-green-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none'>
          <CheckCircle className='h-5 w-5 text-green-700' />
          Mark Pet as Returned
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Pet Return</DialogTitle>
          <DialogDescription>
            Are you sure you want to mark this pet as returned?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className='bg-green-600 text-white hover:bg-green-700'
          >
            {isLoading ? (
              <>
                <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
                Confirming...
              </>
            ) : (
              'Yes, Mark as Returned'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
