import { z } from 'zod';

export const FormPostLostSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  name: z.string().min(1, { message: 'Pet name is required' }),
  type: z.string().min(1, { message: 'Pet type is required' }),
  breed: z.string().optional(),
  age: z.number().min(1, 'Pet age must be at least 1 year').optional(),
  gender: z.enum(['Male', 'Female', 'Unknown'], {
    message: 'Gender is required',
  }),
  images: z.array(z.instanceof(File)).optional(),
  microchip: z.string().optional(),
  description: z.string().optional(),
  lastSeenLocation: z
    .string()
    .min(1, { message: 'Last seen location is required' }),
  latitude: z.number(),
  longitude: z.number(),
  date: z.string().min(1, { message: 'Date lost is required' }),
  time: z.string().min(1, { message: 'Time lost is required' }),
  onlinePost: z.string().optional(),
  bounty: z.number().min(0, 'Bounty must be a positive number').optional(),
});

export const FormPostFoundSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  type: z.string().min(1, { message: 'Pet type is required' }),
  breed: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Unknown'], {
    message: 'Gender is required',
  }),
  images: z.array(z.instanceof(File)).optional(),
  description: z.string().optional(),
  lastSeenLocation: z
    .string()
    .min(1, { message: 'Last seen location is required' }),
  latitude: z.number(),
  longitude: z.number(),
  date: z.string().min(1, { message: 'Date lost is required' }),
  time: z.string().min(1, { message: 'Time lost is required' }),
  onlinePost: z.string().optional(),
});
