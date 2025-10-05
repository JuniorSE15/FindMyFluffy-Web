import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const STRIPE_SECRET_KEY =
  process.env.NEXT_STRIPE_SECRET_KEY ||
  'pk_test_51SAey1PGBIFVg5QWIipPnrRsMOy4gTFzxtGK9Xn0MceCkoK1VgXV8Vf4IR73MClSdNdMvbG0gOhXGGmX1SGS8JEg00x8rKo7yM';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
});

export async function GET(request: NextRequest) {
  try {
    const paymentIntentId = request.nextUrl.searchParams.get('paymentIntentId');

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment Intent ID is required' },
        { status: 400 },
      );
    }

    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return NextResponse.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      created: paymentIntent.created,
    });
  } catch (error) {
    console.error('Error verifying payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment intent' },
      { status: 500 },
    );
  }
}
