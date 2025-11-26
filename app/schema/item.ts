import z from 'zod';

const schema = z.object({
  id: z.coerce.number(),
  listId: z.coerce.number(),
  name: z.string().max(100).min(1),
  url: z.url(),
  description: z.string().optional().nullable(),
});
const newItem = schema.omit({ id: true, listId: true });

export type Item = z.infer<typeof schema>;
export type NewItem = z.infer<typeof newItem>;

export const parseItem = (data: unknown) => schema.parse(data);
export const parseNewItem = (data: unknown) => newItem.parse(data);
