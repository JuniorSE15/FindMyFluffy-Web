'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import { SignInSchema } from '@/schemas/auth.schema';

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof SignInSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className='w-full space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='text'
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
        <div className='flex items-center justify-end gap-2'>
          <Link href='/#'>
            <Button variant='link' className='pr-0'>
              Forgot password?
            </Button>
          </Link>
        </div>
        <div className='mt-6 flex justify-center'>
          <Button
            type='submit'
            variant='default'
            className='bg-interface-secondary text-primary-foreground w-52 cursor-pointer rounded-full border-2 py-6 text-base font-medium transition-all duration-300 ease-in-out'
            size='lg'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2Icon size={24} className='animate-spin' />
                <span>Signing in...</span>
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
