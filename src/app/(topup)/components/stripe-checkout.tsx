'use client';

import React, { useState, useEffect } from 'react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopupFormData } from '@/schemas/topup.schema';
import { Loader2, ChevronLeft } from 'lucide-react';
import getStripe from '@/utils/get-stripejs';
import { useStripePayment } from '@/hooks/useStripePayment';

// Initialize Stripe
const stripePromise = getStripe();

interface StripeCheckoutProps {
  topupData: TopupFormData;
  onCancel: () => void;
}

interface CheckoutFormProps {
  topupData: TopupFormData;
  clientSecret: string;
  onCancel: () => void;
}

function CheckoutForm({ topupData, onCancel }: CheckoutFormProps) {
  const { isLoading, isPolling, errorMessage, handlePayment } =
    useStripePayment();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handlePayment();
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          <Button
            variant='ghost'
            size='sm'
            onClick={onCancel}
            disabled={isLoading || isPolling}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <CardTitle>Complete Payment</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Order Summary */}
        <div className='bg-muted/50 space-y-2 rounded-lg p-4'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>Points:</span>
            <span className='font-semibold'>
              {topupData.points.toLocaleString()}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>Amount:</span>
            <span className='text-primary text-lg font-bold'>
              ฿{topupData.amount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <PaymentElement />

          {errorMessage && (
            <div className='rounded-lg bg-red-50 p-3 text-sm text-red-600'>
              {errorMessage}
            </div>
          )}

          <div className='flex gap-3'>
            <Button
              type='button'
              variant='outline'
              onClick={onCancel}
              disabled={isLoading || isPolling}
              className='flex-1'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isLoading || isPolling}
              className='bg-interface-secondary hover:bg-interface-secondary/80 flex-1'
            >
              {isLoading || isPolling ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  {isPolling ? 'Waiting for payment...' : 'Processing...'}
                </>
              ) : (
                `Pay ฿${topupData.amount.toLocaleString()}`
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function StripeCheckout({
  topupData,
  onCancel,
}: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Create PaymentIntent as soon as the component mounts
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: topupData.amount,
        currency: 'thb',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
      })
      .catch((err) => {
        setError('Failed to initialize payment');
        console.error('Payment initialization error:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topupData.amount]);

  if (isLoading) {
    return (
      <Card className='mx-auto w-full'>
        <CardContent className='flex items-center justify-center py-8'>
          <div className='space-y-3 text-center'>
            <Loader2 className='mx-auto h-8 w-8 animate-spin' />
            <p className='text-muted-foreground text-sm'>
              Initializing payment...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className='mx-auto w-full'>
        <CardContent className='py-8'>
          <div className='space-y-4 text-center'>
            <div className='rounded-lg bg-red-50 p-3 text-sm text-red-600'>
              {error}
            </div>
            <Button onClick={onCancel} variant='outline'>
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!clientSecret) {
    return (
      <Card className='mx-auto w-full'>
        <CardContent className='py-8'>
          <div className='space-y-4 text-center'>
            <p className='text-muted-foreground text-sm'>
              Unable to initialize payment
            </p>
            <Button onClick={onCancel} variant='outline'>
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        topupData={topupData}
        clientSecret={clientSecret}
        onCancel={onCancel}
      />
    </Elements>
  );
}
