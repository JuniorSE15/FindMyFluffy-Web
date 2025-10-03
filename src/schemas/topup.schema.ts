import { z } from 'zod';

export const TopupSchema = z.object({
  points: z
    .number()
    .min(1, { message: 'Points must be at least 1' })
    .max(10000, { message: 'Points cannot exceed 10,000' }),
  amount: z.number().min(1, { message: 'Amount must be at least 1 THB' }),
});

export type TopupFormData = z.infer<typeof TopupSchema>;

// Point to Baht conversion rate (1 point = 1 THB)
export const POINT_TO_BAHT_RATE = 1;

// Predefined point packages
export const POINT_PACKAGES = [
  { points: 100, bonus: 0 },
  { points: 500, bonus: 25 }, // 5% bonus
  { points: 1000, bonus: 100 }, // 10% bonus
  { points: 2000, bonus: 300 }, // 15% bonus
  { points: 5000, bonus: 1000 }, // 20% bonus
];
