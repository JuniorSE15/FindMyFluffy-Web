'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <div className='mx-auto h-screen p-4'>
      <Card>
        <CardContent className='space-y-6 py-12 text-center'>
          <XCircle className='mx-auto h-16 w-16 text-red-500' />
          <div>
            <h1 className='mb-2 text-3xl font-bold text-red-600'>
              Payment Cancelled
            </h1>
            <p className='text-muted-foreground'>
              Your payment was cancelled. No charges were made to your account.
            </p>
          </div>

          <div className='flex flex-col gap-3'>
            <Link href='/topup'>
              <Button className='w-full' size='lg'>
                Try Again
              </Button>
            </Link>
            <Link href='/'>
              <Button variant='outline' className='w-full'>
                Go Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
