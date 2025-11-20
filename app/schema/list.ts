import z from 'zod';

const itemSchema = z.object({
  item: z.string().max(100).min(1),
  url: z.url(),
  description: z.string().optional().nullable(),
});

const listSchema = z.object({
  id: z.string(),
  items: z.array(itemSchema),
});
export type Item = z.infer<typeof itemSchema>;
export type List = z.infer<typeof listSchema>;

export const parseItem = (data: unknown) => itemSchema.parse(data);
export const parseList = (data: unknown) => listSchema.parse(data);
