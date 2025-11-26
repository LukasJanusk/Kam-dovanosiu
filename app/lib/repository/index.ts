import { Insertable } from 'kysely';
import { createDatabase, Database, Item, List } from '../database';
import config from '@/app/config';

const db = createDatabase(config.database);

export function repository(db: Database) {
  const getUser = async (id: string) => {
    return await db
      .selectFrom('neonAuth.usersSync')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirstOrThrow();
  };

  const getEvents = async () => {
    return await db.selectFrom('event').selectAll().execute();
  };

  const getEvent = async (id: number) => {
    return await db
      .selectFrom('event')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirstOrThrow();
  };

  const getParticipantsWithItems = async (eventId: number) => {
    const participants = await db
      .selectFrom('neonAuth.usersSync')
      .leftJoin('list', 'neonAuth.usersSync.id', 'list.userId')
      .select([
        'neonAuth.usersSync.id',
        'neonAuth.usersSync.name',
        'list.id as listId',
      ])
      .where('list.eventId', '=', eventId)
      .execute();

    const allItems = await db
      .selectFrom('item')
      .select(['id', 'name', 'description', 'url', 'listId'])
      .execute();

    const participantsWithItems = participants.map(participant => ({
      ...participant,
      items: allItems.filter(item => item.listId === participant.listId),
    }));

    return participantsWithItems;
  };

  const createList = async (
    newList: Insertable<List>,
    items: Insertable<Item>[]
  ) => {
    const list = await db
      .insertInto('list')
      .values(newList)
      .returningAll()
      .executeTakeFirstOrThrow();

    await db
      .insertInto('item')
      .values(
        items.map(item => ({
          ...item,
          listId: list.id,
        }))
      )
      .returningAll()
      .execute();

    return list;
  };

  return { getUser, getEvent, getEvents, getParticipantsWithItems, createList };
}

export const createRepository = () => repository(db);
