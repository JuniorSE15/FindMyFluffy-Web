'use client';
import { useForm } from 'react-hook-form';
import FoundPetDetailsForm from '@/app/(post)/components/found-pet-details-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TopBarPostForm } from '@/app/(post)/components/top-bar';
import { FormPostFoundSchema } from '@/schemas/post.schema';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useState, useEffect } from 'react';
import { submitFoundPetPostAction } from '@/services/post.service';
import { toast } from 'sonner';
import { getSessionAction } from '@/services/auth.service';

export default function FoundReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
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

  useEffect(() => {
    const getUserSession = async () => {
      try {
        const session = await getSessionAction();
        if (session?.userId) {
          setUserId(session.userId);
        }
      } catch (error) {
        console.error('Failed to get user session:', error);
        // Redirect to login if not authenticated
        router.push('/signin');
      }
    };

    getUserSession();
  }, [router]);

  const onSubmit = async (data: z.infer<typeof FormPostFoundSchema>) => {
    if (!userId) {
      toast.error('You must be logged in to submit a report');
      router.push('/signin');
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Form submitted:', data);

      const result = await submitFoundPetPostAction(data, userId);

      if (result) {
        toast.success('Found pet report submitted successfully!');
        router.push('/');
      } else {
        throw new Error('Failed to submit found pet report. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      let errorMessage = 'Failed to submit report. Please try again.';

      if (error instanceof Error) {
        if (error.message.includes('Validation errors:')) {
          errorMessage = error.message;
        } else if (
          error.message.includes('401') ||
          error.message.includes('Unauthorized')
        ) {
          errorMessage = 'Your session has expired. Please log in again.';
          router.push('/signin');
          return;
        } else if (error.message.includes('400')) {
          errorMessage =
            'Invalid data submitted. Please check your inputs and try again.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Server error occurred. Please try again later.';
        } else {
          errorMessage = error.message;
        }
      }

      alert(errorMessage);
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
