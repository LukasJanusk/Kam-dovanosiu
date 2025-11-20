import z from 'zod';

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
});

export const parseUser = (data: unknown) => userSchema.parse(data);
export type User = z.infer<typeof userSchema>;
