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
import { FormPostLostSchema } from '@/schemas/post.schema';
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
import 'leaflet/dist/leaflet.css';

import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('./map-picker'), {
  ssr: false,
});

interface LostPetDetailsFormProps {
  form: UseFormReturn<z.infer<typeof FormPostLostSchema>>;
}

export default function LostPetDetailsForm({ form }: LostPetDetailsFormProps) {
  const handleImagesChange = (files: File[]) => {
    form.setValue('images', files);
  };

  return (
    <>
      {/* Title Section */}
      <Card className='mt-6 flex w-full flex-col gap-2 p-4'>
        <h1 className='text-primary-text text-left text-2xl font-bold'>
          Post Title
        </h1>
        <div className='mt-2 flex w-full flex-col gap-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='bg-accent rounded-xl'
                    placeholder='e.g., Lost Golden Retriever in Central Park'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>

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
            name='petName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet Name</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='bg-accent rounded-xl'
                    placeholder='e.g., Buddy'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name='age'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    className='bg-accent rounded-xl'
                    placeholder='e.g., 3'
                    min='1'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : undefined,
                      )
                    }
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
            name='microchip'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Microchip ID (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='bg-accent rounded-xl'
                    placeholder='e.g., 123456789012345'
                    {...field}
                  />
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
                    onChange={(e) => {
                      form.setValue('lastSeenLocation', e.target.value);
                      window.dispatchEvent(
                        new CustomEvent('manual-address-edit'),
                      );
                    }}
                  />
                </FormControl>
                <div className='relative z-10 h-64 w-full overflow-hidden rounded-xl'>
                  <MapPicker
                    address={field.value}
                    onAddressChange={(address) =>
                      form.setValue('lastSeenLocation', address)
                    }
                    onLatLngChange={(latLng) => {
                      form.setValue('lastSeenLat', latLng.lat);
                      form.setValue('lastSeenLng', latLng.lng);
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='dateLost'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Lost</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      className='bg-accent rounded-xl'
                      max={new Date().toISOString().split('T')[0]}
                      min='2000-01-01'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='timeLost'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Lost</FormLabel>
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
          <FormField
            control={form.control}
            name='bounty'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bounty (Optional)</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type='number'
                      className='bg-accent rounded-xl pr-8'
                      placeholder='e.g., 50'
                      min='0'
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined,
                        )
                      }
                    />
                    <span className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500'>
                      ฿
                    </span>
                  </div>
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
