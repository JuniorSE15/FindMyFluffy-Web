'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <Card className='w-full'>
        <CardContent className='space-y-6 py-12 text-center'>
          <CheckCircle2 className='mx-auto h-16 w-16' />
          <div>
            <h1 className='mb-2 text-3xl font-semibold'>Payment Successful!</h1>
            <p className='text-muted-foreground'>
              Your points have been successfully added to your account.
            </p>
          </div>

          <div className='flex flex-col gap-3'>
            <Link href='/'>
              <Button
                className='bg-interface-primary hover:bg-interface-primary/80 w-full'
                size='lg'
              >
                Continue to App
              </Button>
            </Link>
            <Link href='/topup'>
              <Button variant='outline' className='w-full' size='lg'>
                Top-up Again
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
