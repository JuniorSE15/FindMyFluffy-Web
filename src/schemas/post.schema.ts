import { title } from 'motion/react-m';
import { z } from 'zod';

export const FormPostLostSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  petName: z.string().min(1, { message: 'Pet name is required' }),
  petType: z.string().min(1, { message: 'Pet type is required' }),
  breed: z.string().optional(),
  age: z.transform(Number).pipe(z.number().min(1, 'Pet Age is required')),
  gender: z.enum(['Male', 'Female', 'Unknown'], {
    message: 'Gender is required',
  }),
  images: z.array(z.instanceof(File)).optional(),
  microchip: z.string().optional(),
  description: z.string().optional(),
  lastSeenLocation: z
    .string()
    .min(1, { message: 'Last seen location is required' }),
  dateLost: z.string().min(1, { message: 'Date lost is required' }),
  lastSeenLat: z.number().optional(),
  lastSeenLng: z.number().optional(),
  timeLost: z.string().min(1, { message: 'Time lost is required' }),
  socialMediaLink: z.string().optional(),
});

export const FormPostFoundSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  petType: z.string().min(1, { message: 'Pet type is required' }),
  breed: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Unknown'], {
    message: 'Gender is required',
  }),
  images: z.array(z.instanceof(File)).optional(),
  description: z.string().optional(),
  lastSeenLocation: z
    .string()
    .min(1, { message: 'Last seen location is required' }),
  lastSeenLat: z.number().optional(),
  lastSeenLng: z.number().optional(),
  dateFound: z.string().min(1, { message: 'Date lost is required' }),
  timeFound: z.string().min(1, { message: 'Time lost is required' }),
  socialMediaLink: z.string().optional(),
});
