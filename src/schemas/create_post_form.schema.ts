import { z } from 'zod';

export const FormPostLostSchema = z.object({});

export const FormPostFoundSchema = z.object({
  PetType: z.string().min(1, { message: 'Pet type is required' }),
  Breed: z.string().optional(),
  Gender: z.enum,
  LastSeenLocation: z
    .string()
    .min(1, { message: 'Last seen location is required' }),
  DateLost: z.string().min(1, { message: 'Date lost is required' }),
  TimeLost: z.string().min(1, { message: 'Time lost is required' }),
  SocialMediaLink: z.string().optional(),
});
