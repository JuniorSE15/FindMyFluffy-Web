'use client';

import React, { useState } from 'react';
import { PointInputForm } from '../components/point-input-form';
import StripeCheckout from '../components/stripe-checkout';
import { TopupFormData } from '@/schemas/topup.schema';

type Step = 'input' | 'payment';

export default function TopupPage() {
  const [currentStep, setCurrentStep] = useState<Step>('input');
  const [topupData, setTopupData] = useState<TopupFormData | null>(null);

  const handlePointsSubmit = (data: TopupFormData) => {
    setTopupData(data);
    setCurrentStep('payment');
  };

  const handleCancel = () => {
    setCurrentStep('input');
  };

  return (
    <div className='bg-background flex h-screen flex-col'>
      <div className='border-b border-gray-100 bg-white px-4 py-4'>
        <h1 className='text-center text-lg font-semibold text-gray-900'>
          Top Up Points
        </h1>
      </div>
      <div className='p-4'>
        {currentStep === 'input' && (
          <PointInputForm onSubmit={handlePointsSubmit} />
        )}

        {currentStep === 'payment' && topupData && (
          <StripeCheckout topupData={topupData} onCancel={handleCancel} />
        )}
      </div>
    </div>
  );
}
