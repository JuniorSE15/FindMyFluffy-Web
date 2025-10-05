export enum PaymentErrorStatusEnum {
  PROCESSING = 'Payment is being processed. This may take a few moments...',
  CANCELLED = 'Payment failed or was canceled.',
  ERROR = 'Error checking payment status.',
  PENDING = 'Payment is taking longer than expected. Please check your payment status.',
  DEFAULT = 'An unexpected error occurred',
}

export enum PaymentIntentStatusEnum {
  SUCCEEDED = 'succeeded',
  CANCELLED = 'canceled',
  PAYMENT_FAILED = 'payment_failed',
  REQUIRES_PAYMENT_METHOD = 'requires_payment_method',
  REQUIRES_CONFIRMATION = 'requires_confirmation',
  REQUIRES_ACTION = 'requires_action',
  PROCESSING = 'processing',
  REQUIRES_CAPTURE = 'requires_capture',
}
