import { VerifyPaymentResponse } from '@/types/payment';
import { baseApiAction } from './api.service';

export async function verifyPaymentIntentAction(paymentIntentId: string) {
  try {
    const response = await baseApiAction<VerifyPaymentResponse>(
      `/api/payment/verify-payment-intent?paymentIntentId=${paymentIntentId}`,
      {
        method: 'GET',
        requiresAuth: false,
      },
    );

    if (response.error) {
      throw new Error(response.error.detail);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
