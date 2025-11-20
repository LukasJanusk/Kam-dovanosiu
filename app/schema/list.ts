import z from 'zod';

export const listSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  userId: z.string(),
  description: z.string().optional().nullable(),
});

export type List = z.infer<typeof listSchema>;
export const parseList = (data: unknown) => listSchema.parse(data);
