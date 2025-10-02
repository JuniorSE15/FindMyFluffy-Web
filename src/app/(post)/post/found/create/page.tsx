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
import { getSessionAction } from '@/services/auth.service';
import { toast } from 'sonner';

export default function FoundReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState('');
  const form = useForm<z.infer<typeof FormPostFoundSchema>>({
    resolver: zodResolver(FormPostFoundSchema),
    defaultValues: {
      title: '',
      breed: '',
      gender: 'Unknown',
      type: '',
      images: [],
      description: '',
      lastSeenLocation: '',
      latitude: undefined,
      longitude: undefined,
      date: '',
      time: '',
      onlinePost: '',
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
      }
    };

    getUserSession();
  }, []);

  const onSubmit = async (data: z.infer<typeof FormPostFoundSchema>) => {
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
