import z from 'zod';

const schema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
});

export type Event = z.infer<typeof schema>;
export const parseEvent = (data: unknown) => schema.parse(data);
