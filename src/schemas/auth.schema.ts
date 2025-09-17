import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const SignUpSchema = z.object({
  fullName: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  phoneNumber: z
    .string()
    .min(10)
    .max(10)
    .regex(
      /^(0[689]{1})+([0-9]{8})+$/,
      'Phone number must be a number and without -',
    ),
});
