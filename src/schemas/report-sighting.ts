import z from 'zod';

export const ReportSightingSchema = z.object({
  postId: z.string().min(1, { message: 'Post ID is required' }),
  userId: z.string().min(1, { message: 'User ID is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  latitude: z
    .number()
    .min(-90)
    .max(90, { message: 'Latitude must be between -90 and 90' }),
  longitude: z
    .number()
    .min(-180)
    .max(180, { message: 'Longitude must be between -180 and 180' }),
  fnlDatetime: z.string().min(1, { message: 'Final Datetime is required' }),
  images: z.array(z.instanceof(File)).optional(),
});
