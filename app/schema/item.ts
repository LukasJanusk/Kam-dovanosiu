import z from 'zod';

const schema = z.object({
  id: z.string(),
  listId: z.string(),
  item: z.string().max(100).min(1),
  url: z.url(),
  description: z.string().optional().nullable(),
});

export type Item = z.infer<typeof schema>;
export const parseItem = (data: unknown) => schema.parse(data);
