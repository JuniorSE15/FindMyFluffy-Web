'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  TopupSchema,
  TopupFormData,
  POINT_TO_BAHT_RATE,
  POINT_PACKAGES,
} from '@/schemas/topup.schema';
import { Loader2Icon } from 'lucide-react';

interface PointInputFormProps {
  onSubmit: (data: TopupFormData) => void;
  isLoading?: boolean;
}

export function PointInputForm({ onSubmit, isLoading }: PointInputFormProps) {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const form = useForm<TopupFormData>({
    resolver: zodResolver(TopupSchema),
    defaultValues: {
      points: 0,
    },
  });

  const watchedPoints = form.watch('points');
  const calculatedAmount = watchedPoints * POINT_TO_BAHT_RATE;

  // Update amount when points change
  useEffect(() => {
    form.setValue('amount', calculatedAmount);
  }, [calculatedAmount, form]);

  const handlePackageSelect = (packageData: {
    points: number;
    bonus: number;
  }) => {
    const totalPoints = packageData.points + packageData.bonus;
    form.setValue('points', totalPoints);
    form.setValue('amount', packageData.points * POINT_TO_BAHT_RATE);
    setSelectedPackage(packageData.points);
  };

  const handleCustomInput = (value: number) => {
    form.setValue('points', value);
    setSelectedPackage(null);
  };

  const handleSubmit = (data: TopupFormData) => {
    onSubmit(data);
  };

  return (
    <div className='space-y-6'>
      {/* Quick Packages */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-semibold'>
            Quick Packages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-3'>
            {POINT_PACKAGES.map((pkg) => (
              <Button
                key={pkg.points}
                type='button'
                variant={selectedPackage === pkg.points ? 'default' : 'outline'}
                className='h-auto flex-col p-4'
                onClick={() => handlePackageSelect(pkg)}
              >
                <h2 className='text-lg font-bold'>
                  {pkg.points + pkg.bonus} Points
                </h2>
                <h3 className='text-muted-foreground text-sm'>฿{pkg.points}</h3>
                {pkg.bonus > 0 && (
                  <h3 className='text-xs font-medium text-green-600'>
                    +{pkg.bonus} Bonus!
                  </h3>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Amount Form */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-semibold'>Custom Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='points'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points to Purchase</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter points amount'
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          field.onChange(value);
                          handleCustomInput(value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>1 Point = ฿1 THB</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount Display */}
              <div className='bg-muted/50 rounded-lg border p-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Total Amount:</span>
                  <span className='text-primary text-2xl font-bold'>
                    ฿{calculatedAmount.toLocaleString()}
                  </span>
                </div>
                <div className='mt-2 flex items-center justify-between'>
                  <span className='text-muted-foreground text-sm'>Points:</span>
                  <span className='text-lg font-semibold'>
                    {watchedPoints.toLocaleString()} Points
                  </span>
                </div>
              </div>

              <Button
                type='submit'
                className='bg-interface-primary hover:bg-interface-primary/80 w-full'
                disabled={isLoading || watchedPoints <= 0}
                size='lg'
              >
                {isLoading ? (
                  <>
                    <Loader2Icon size={24} className='animate-spin' />
                    <span>Processing...</span>
                  </>
                ) : (
                  'Continue to Payment'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
