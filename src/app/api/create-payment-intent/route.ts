import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const STRIPE_SECRET_KEY =
  process.env.NEXT_STRIPE_SECRET_KEY ||
  'pk_test_51SAey1PGBIFVg5QWIipPnrRsMOy4gTFzxtGK9Xn0MceCkoK1VgXV8Vf4IR73MClSdNdMvbG0gOhXGGmX1SGS8JEg00x8rKo7yM';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'thb' } = await request.json();

    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: 'Amount must be at least 50 cents (or equivalent)' },
        { status: 400 },
      );
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency,
      payment_method_types: ['promptpay'],
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 },
    );
  }
}
