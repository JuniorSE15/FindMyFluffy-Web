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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReportSightingSchema } from '@/schemas/report-sighting';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Loader2Icon } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import UploadPicture from '../../upload-picture';
import { usePost } from '@/hooks/usePost';

import 'leaflet/dist/leaflet.css';

const MapPicker = dynamic(() => import('../../map-picker'), {
  ssr: false,
});

interface ReportDialogProps {
  postId: string;
}

export const ReportDialog = ({ postId }: ReportDialogProps) => {
  const { user } = useUser();
  const { reportFoundPetPostMutation } = usePost({ postId: undefined });
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(false);
  const handleSubmit = (data: z.infer<typeof ReportSightingSchema>) => {
    reportFoundPetPostMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        setAddress('');
        setOpen(false);
      },
      onError: (error) => {
        console.error('Error submitting form:', error);
      },
    });
  };

  const handleImagesChange = (files: File[]) => {
    form.setValue('images', files);
  };

  const form = useForm<z.infer<typeof ReportSightingSchema>>({
    resolver: zodResolver(ReportSightingSchema),
    defaultValues: {
      postId,
      userId: user?.id || '',
      description: '',
      latitude: 0,
      longitude: 0,
      fnlDatetime: '',
      images: [],
    },
  });

  // Update userId when user data becomes available
  useEffect(() => {
    if (user?.id) {
      form.setValue('userId', user.id);
    }
  }, [user?.id, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTrigger asChild>
          <button
            className='flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-orange-900'
            style={{ backgroundColor: '#f0d3b8' }}
          >
            <Eye className='h-5 w-5 text-orange-900' />
            Click here to report found pet
          </button>
        </DialogTrigger>
        <DialogContent className='max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Report found pet</DialogTitle>
            <DialogDescription>
              Report found pet here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          {Object.keys(form.formState.errors).length > 0 && (
            <div className='mb-4 rounded-md border border-red-200 bg-red-50 p-3'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-red-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-red-800'>
                    Please fix the following errors:
                  </h3>
                  <div className='mt-2 text-sm text-red-700'>
                    <ul className='list-disc space-y-1 pl-5'>
                      {Object.entries(form.formState.errors).map(
                        ([field, error]) => (
                          <li key={field}>
                            {error?.message || `${field} is required`}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                className='bg-accent'
                placeholder='Provide additional details about the pet'
                {...form.register('description')}
              />
            </div>
            <div className='grid gap-3'>
              <Input
                type='text'
                className='bg-accent'
                placeholder='e.g., Central Park, New York'
                onChange={(e) => {
                  setAddress(e.target.value);
                  window.dispatchEvent(new CustomEvent('manual-address-edit'));
                }}
              />
              <div className='relative z-10 h-64 w-full overflow-hidden rounded-xl'>
                <MapPicker
                  address={address}
                  onAddressChange={(address) => setAddress(address)}
                  onLatLngChange={(latLng) => {
                    form.setValue('latitude', latLng.lat);
                    form.setValue('longitude', latLng.lng);
                  }}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='latitude'>Latitude</Label>
                <Input
                  id='latitude'
                  type='number'
                  step='any'
                  defaultValue={form.watch('latitude')}
                  {...form.register('latitude', { valueAsNumber: true })}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='longitude'>Longitude</Label>
                <Input
                  id='longitude'
                  type='number'
                  step='any'
                  defaultValue={form.watch('longitude')}
                  {...form.register('longitude', { valueAsNumber: true })}
                />
              </div>
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='fnlDatetime'>Final Datetime</Label>
              <Input
                type='datetime-local'
                id='fnlDatetime'
                {...form.register('fnlDatetime')}
              />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='images'>Images</Label>
              <UploadPicture
                maxFiles={1}
                maxFileSize={10}
                onFilesChange={handleImagesChange}
              />
            </div>
          </div>

          {/* Loading State */}
          {reportFoundPetPostMutation.isPending && (
            <div className='flex items-center justify-center py-4'>
              <Loader2Icon className='mr-2 h-6 w-6 animate-spin text-blue-500' />
              <span className='text-sm text-gray-600'>
                Submitting report...
              </span>
            </div>
          )}

          {/* Error State */}
          {reportFoundPetPostMutation.error && (
            <div className='mb-4 rounded-md border border-red-200 bg-red-50 p-3'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-red-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-red-800'>
                    Submission failed
                  </h3>
                  <div className='mt-2 text-sm text-red-700'>
                    {reportFoundPetPostMutation.error.message}
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button
              disabled={reportFoundPetPostMutation.isPending}
              onClick={async (e) => {
                e.preventDefault();

                // Check if user is available
                if (!user?.id) {
                  console.log('User not available, cannot submit');
                  return;
                }

                // Trigger validation
                const isValid = await form.trigger();
                console.log('Form is valid:', isValid);

                if (isValid) {
                  const data = form.getValues();
                  console.log('Submitting data:', data);
                  handleSubmit(data);
                } else {
                  console.log('Form validation failed:', form.formState.errors);
                }
              }}
              className='bg-primary-bg hover:bg-primary-bg/90 text-white'
            >
              {reportFoundPetPostMutation.isPending ? (
                <Loader2Icon className='animate-spin' />
              ) : (
                'Save changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
