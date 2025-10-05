'use client';

import { useForm } from 'react-hook-form';
import LostPetDetailsForm from '@/app/(post)/components/lost-pet-details-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TopBarPostForm } from '@/app/(post)/components/top-bar';
import { FormPostLostSchema } from '@/schemas/post.schema';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useState, useEffect } from 'react';
import { submitLostPetPostAction } from '@/services/post.service';
import { getSessionAction } from '@/services/auth.service';
import { toast } from 'sonner';

export default function LostReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState('');
  const form = useForm<z.infer<typeof FormPostLostSchema>>({
    resolver: zodResolver(FormPostLostSchema),
    defaultValues: {
      title: '',
      name: '',
      age: undefined,
      breed: '',
      gender: 'Unknown',
      type: '',
      images: [],
      microchip: '',
      description: '',
      lastSeenLocation: '',
      latitude: undefined,
      longitude: undefined,
      date: '',
      time: '',
      onlinePost: '',
      bounty: undefined,
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

  const onSubmit = async (data: z.infer<typeof FormPostLostSchema>) => {
    try {
      setIsSubmitting(true);
      console.log('Form submitted:', data);

      const result = await submitLostPetPostAction(data, userId);

      if (result) {
        toast.success('Lost pet report submitted successfully!');
        router.push('/');
      } else {
        throw new Error('No response data received from server');
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
            Report a Lost pet
          </h1>
        </div>
        <div className='px-2 pb-6 md:px-10'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-0'>
              <LostPetDetailsForm form={form} />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
