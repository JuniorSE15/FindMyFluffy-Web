'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react';
import { SignUpSchema } from '@/schemas/auth.schema';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
  });

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className='w-full space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  id='fullName'
                  placeholder='full name'
                  className='bg-accent h-[54px] rounded-xl'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  id='email'
                  placeholder='email'
                  className='bg-accent h-[54px] rounded-xl'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative flex items-center gap-2'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    placeholder='password'
                    className='bg-accent h-[54px] rounded-xl'
                    {...field}
                  />
                  <div className='absolute top-1/2 right-4 -translate-y-1/2'>
                    {showPassword ? (
                      <EyeIcon
                        size={20}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <EyeOffIcon
                        size={20}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  id='phoneNumber'
                  placeholder='09XXXXXXXX'
                  className='bg-accent h-[54px] rounded-xl'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-start gap-2'>
          <Checkbox id='terms' />
          <Label htmlFor='terms' className='text-secondary-text'>
            I agree with terms &amp; conditions
          </Label>
        </div>
        <div className='mt-6 flex justify-center'>
          <Button
            type='submit'
            variant='outline'
            className='border-secondary-bg text-secondary-bg w-52 cursor-pointer rounded-full border-2 py-6 text-base font-medium transition-all duration-300 ease-in-out'
            size='lg'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2Icon size={24} className='animate-spin' />
                <span>Signing up...</span>
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
