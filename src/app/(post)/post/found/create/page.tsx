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

export default function FoundReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    try {
      setIsSubmitting(true);
      console.log('Form submitted:', data);

      // api call here

      alert('Found pet report submitted successfully!');
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
        Report a found pet
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-0'>
          <FoundPetDetailsForm form={form} />
        </form>
      </Form>
    </div>
  );
}
