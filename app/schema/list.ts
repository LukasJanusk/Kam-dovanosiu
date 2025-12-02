import z from 'zod';
import { schema as itemSchema } from '@/app/schema/item';

export const listSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  userId: z.string(),
});

const participantListSchema = z.object({
  listId: z.coerce.number(),
  eventId: z.coerce.number(),
  eventTitle: z.string(),
  eventDescription: z.string(),
  items: z.array(itemSchema),
});

export type ParticipantList = z.infer<typeof participantListSchema>;
export type List = z.infer<typeof listSchema>;
export const parseList = (data: unknown) => listSchema.parse(data);
export const parseParticipantList = (data: unknown) =>
  participantListSchema.parse(data);
export const parseParticipantLists = (data: unknown) =>
  participantListSchema.array().parse(data);
