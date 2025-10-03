import { useState } from 'react';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import {
  PaymentErrorStatusEnum,
  PaymentIntentStatusEnum,
} from '@/enums/payment.enum';
import { verifyPaymentIntentAction } from '@/services/payment.service';

export function useStripePayment() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  // Function to poll payment status
  const pollPaymentStatus = async (paymentIntentId: string) => {
    setIsPolling(true);
    const MAX_ATTEMPTS = 30; // Poll for up to 5 minutes (30 * 10 seconds)
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await verifyPaymentIntentAction(paymentIntentId);

        if (response?.status === 'succeeded') {
          setIsPolling(false);
          router.push('/topup/success');
          return;
        } else if (response?.status === 'canceled') {
          setIsPolling(false);
          setErrorMessage(PaymentErrorStatusEnum.CANCELLED);
          router.push('/topup/cancel');
          return;
        }

        attempts++;
        if (attempts < MAX_ATTEMPTS) {
          setTimeout(poll, 10000); // Poll every 10 seconds
        } else {
          setIsPolling(false);
          setErrorMessage(PaymentErrorStatusEnum.PENDING);
        }
      } catch (error) {
        console.error('Error polling payment status:', error);
        setIsPolling(false);
        setErrorMessage(PaymentErrorStatusEnum.ERROR);
      }
    };

    poll();
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/topup/success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message || PaymentErrorStatusEnum.DEFAULT);
        console.error('Payment error:', error);
      } else if (paymentIntent) {
        // Handle different payment statuses
        switch (paymentIntent.status) {
          case PaymentIntentStatusEnum.SUCCEEDED:
            router.push('/topup/success');
            break;
          case PaymentIntentStatusEnum.PROCESSING:
            // For PromptPay, payment might be processing
            // Start polling for payment status
            setErrorMessage(PaymentErrorStatusEnum.PROCESSING);
            pollPaymentStatus(paymentIntent.id);
            break;
          case PaymentIntentStatusEnum.REQUIRES_ACTION:
            // Payment requires additional action (like scanning QR code)
            // The PaymentElement should handle this automatically
            setErrorMessage(PaymentErrorStatusEnum.PROCESSING);
            pollPaymentStatus(paymentIntent.id);
            break;
          case PaymentIntentStatusEnum.REQUIRES_PAYMENT_METHOD:
            setErrorMessage(PaymentErrorStatusEnum.DEFAULT);
            break;
          case PaymentIntentStatusEnum.CANCELLED:
            setErrorMessage(PaymentErrorStatusEnum.CANCELLED);
            break;
          default:
            setErrorMessage(
              `${PaymentErrorStatusEnum.DEFAULT} ${paymentIntent.status}`,
            );
            break;
        }
      }
    } catch (err) {
      setErrorMessage(PaymentErrorStatusEnum.DEFAULT);
      console.error('Payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setErrorMessage('');
  };

  return {
    isLoading,
    isPolling,
    errorMessage,
    handlePayment,
    clearError,
  };
}
