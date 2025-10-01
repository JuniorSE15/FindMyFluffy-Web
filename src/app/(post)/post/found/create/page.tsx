'use client';
import { useForm } from 'react-hook-form';
import FoundPetDetailsForm from '@/app/(post)/components/found-pet-details-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TopBarPostForm } from '@/app/(post)/components/top-bar';
import { FormPostFoundSchema } from '@/schemas/post.schema';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { submitFoundPetPostAction } from '@/services/post.service';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function FoundReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { session } = useAuth();
  const form = useForm<z.infer<typeof FormPostFoundSchema>>({
    resolver: zodResolver(FormPostFoundSchema),
    defaultValues: {
      title: '',
      breed: '',
      gender: 'Unknown',
      petType: '',
      images: [],
      description: '',
      lastSeenLocation: '',
      dateFound: '',
      timeFound: '',
      socialMediaLink: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormPostFoundSchema>) => {
    if (!session?.userId) {
      toast.error('You must be logged in to submit a report');
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Form submitted:', data);

      const result = await submitFoundPetPostAction(data, session.userId);

      if (result) {
        toast.success('Found pet report submitted successfully!', {
          description:
            'Your report has been posted and is now visible to others.',
        });
        router.push('/');
      }
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to submit report. Please try again.';
      toast.error('Submission failed', {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='relative mx-auto flex h-screen w-full max-w-xl flex-col rounded-lg shadow-2xl'>
      <TopBarPostForm
        onPost={() => form.handleSubmit(onSubmit)()}
        onClose={() => router.back()}
        isLoading={isSubmitting}
      />
      <div className='flex-1 overflow-y-auto'>
        <div className='px-2 py-6 md:px-10'>
          <h1 className='text-primary-text text-left text-2xl leading-10 font-bold'>
            Report a found pet
          </h1>
        </div>
        <div className='px-2 pb-6 md:px-10'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-0'>
              <FoundPetDetailsForm form={form} />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
