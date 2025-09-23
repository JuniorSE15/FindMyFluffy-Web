'use client';

import { useForm } from 'react-hook-form';
import LostPetDetailsForm from '@/app/(post)/components/lost-pet-details-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TopBarPostForm } from '@/app/(post)/components/top-bar';
import { FormPostLostSchema } from '@/schemas/post.schema';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useState } from 'react';

export default function LostReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormPostLostSchema>>({
    resolver: zodResolver(FormPostLostSchema),
    defaultValues: {
      title: '',
      petName: '',
      age: 0,
      breed: '',
      gender: 'Unknown',
      petType: '',
      images: [],
      microchip: '',
      description: '',
      lastSeenLocation: '',
      dateLost: '',
      timeLost: '',
      socialMediaLink: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormPostLostSchema>) => {
    try {
      setIsSubmitting(true);
      console.log('Form submitted:', data);

      // api call here

      alert('Lost pet report submitted successfully!');
      router.push('/');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='relative mx-auto flex h-full min-h-screen w-full max-w-xl flex-col justify-start rounded-lg px-2 py-6 shadow-2xl md:px-10'>
      <TopBarPostForm
        onPost={() => form.handleSubmit(onSubmit)()}
        onClose={() => router.back()}
        isLoading={isSubmitting}
      />
      <h1 className='text-primary-text text-left text-2xl leading-10 font-bold'>
        Report a Lost pet
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-0'>
          <LostPetDetailsForm form={form} />
        </form>
      </Form>
    </div>
  );
}
