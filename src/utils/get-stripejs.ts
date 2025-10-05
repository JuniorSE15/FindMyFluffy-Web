import { Stripe, loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
  'pk_test_51SAey1PGBIFVg5QWIipPnrRsMOy4gTFzxtGK9Xn0MceCkoK1VgXV8Vf4IR73MClSdNdMvbG0gOhXGGmX1SGS8JEg00x8rKo7yM';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
