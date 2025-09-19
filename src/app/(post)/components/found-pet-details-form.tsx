'use client';
import { Card } from '@/components/ui/card';

import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormPostFoundSchema } from '@/schemas/post.schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UploadPicture from './upload-picture';

interface FoundPetDetailsFormProps {
  form: UseFormReturn<z.infer<typeof FormPostFoundSchema>>;
}

export default function FoundPetDetailsForm({
  form,
}: FoundPetDetailsFormProps) {
  const handleImagesChange = (files: File[]) => {
    form.setValue('images', files);
  };

  return (
    <>
      {/* Upload Pictures Section */}
      <Card className='mt-6 flex w-full flex-col gap-2 p-4'>
        <h1 className='text-primary-text text-left text-2xl font-bold'>
          Upload Pictures
        </h1>
        <div className='mt-2 flex w-full flex-col gap-4'>
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem>
                <FormControl>
                  <UploadPicture
                    maxFiles={5}
                    maxFileSize={10}
                    onFilesChange={handleImagesChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Pet Details Section */}
      <Card className='mt-6 flex w-full flex-col gap-2 p-4'>
        <h1 className='text-primary-text text-left text-2xl leading-10 font-bold'>
          Pet Details
        </h1>
        <div className='mt-2 flex w-full flex-col gap-4'>
          <FormField
            control={form.control}
            name='petType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a pet type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Dog'>Dog</SelectItem>
                      <SelectItem value='Cat'>Cat</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='breed'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breed</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    id='breed'
                    className='bg-accent rounded-xl'
                    placeholder='e.g., Golden Retriever'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a gender' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Male'>Male</SelectItem>
                      <SelectItem value='Female'>Female</SelectItem>
                      <SelectItem value='Unknown'>Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    id='description'
                    className='bg-accent rounded-xl'
                    placeholder='Provide additional details about the pet'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Location and Time Section (Might separate this into another component) */}
      <Card className='mt-6 flex w-full flex-col gap-2 p-4'>
        <h1 className='text-primary-text text-left text-2xl leading-10 font-bold'>
          Time and Location
        </h1>
        <div className='mt-2 flex w-full flex-col gap-4'>
          <FormField
            control={form.control}
            name='lastSeenLocation'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Seen Location</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='bg-accent rounded-xl'
                    placeholder='e.g., Central Park, New York'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='dateFound'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Found</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      className='bg-accent rounded-xl'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='timeFound'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Found</FormLabel>
                  <FormControl>
                    <Input
                      type='time'
                      className='bg-accent rounded-xl'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='socialMediaLink'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Media Link (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type='url'
                    className='bg-accent rounded-xl'
                    placeholder='https://facebook.com/post/123'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>
    </>
  );
}
