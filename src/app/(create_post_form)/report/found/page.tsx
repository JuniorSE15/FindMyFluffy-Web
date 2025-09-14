'use client';
import { Card } from '@/components/ui/card';
import FoundPetDetailsForm from './components/FoundPetDetailsForm';

export default function FoundReportPage() {
  return (
    <div className='relative flex h-full min-h-screen w-full flex-col justify-start px-2 py-6 md:px-10'>
      <h1 className='text-primary-text text-left text-2xl leading-10 font-bold'>
        Report a found pet
      </h1>
      <Card className='mt-6 flex w-full flex-col gap-2 p-4'>
        <h1 className='text-primary-text text-left text-2xl font-bold'>
          Upload Picture
        </h1>
        <Card className='mt-2 flex w-full flex-col gap-4 p-6'></Card>
      </Card>
      <FoundPetDetailsForm />
    </div>
  );
}
