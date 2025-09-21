import { z } from 'zod';

export const SignUpSchema = z.object({
  userName: z.string().min(1),
  email: z.email(),
  password: z
    .string()
    .min(8)
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      'Password must contain at least one special character',
    ),
  phoneNumber: z
    .string()
    .min(10)
    .max(10)
    .regex(
      /^(0[689]{1})+([0-9]{8})+$/,
      'Phone number must be a number and without -',
    ),
});

export const SignInSchema = SignUpSchema.pick({
  email: true,
  password: true,
});
