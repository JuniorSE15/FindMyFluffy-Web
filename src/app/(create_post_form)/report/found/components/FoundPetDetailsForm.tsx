'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormPostFoundSchema } from '@/schemas/create_post_form.schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function FoundPetDetailsForm() {
  const form = useForm<z.infer<typeof FormPostFoundSchema>>({
    resolver: zodResolver(FormPostFoundSchema),
  });

  return (
    <Form {...form}>
      <Card className='mt-6 flex w-full flex-col gap-2 p-4'>
        <h1 className='text-primary-text text-left text-2xl leading-10 font-bold'>
          Pet Details
        </h1>
        <form className='mt-2 flex w-full flex-col gap-4'>
          <FormField
            control={form.control}
            name='PetType'
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
        </form>
      </Card>
    </Form>
  );
}
