export type PaymentVerifyStatusEnum =
  | 'processing'
  | 'cancelled'
  | 'error'
  | 'pending'
  | 'default';

export type PaymentIntentStatus =
  | 'succeeded'
  | 'processing'
  | 'requires_action'
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'requires_capture'
  | 'canceled';

export type VerifyPaymentResponse = {
  status: PaymentIntentStatus;
  amount: number;
  currency: string;
  created: number;
};

export type CreatePaymentIntentRequest = {
  amount: number;
  currency: string;
};

export type CreatePaymentIntentResponse = {
  clientSecret: string;
  paymentIntentId: string;
};
