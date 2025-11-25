import { Database } from '../database';

export function repository(db: Database) {
  const getUser = async (id: string) => {
    return await db
      .selectFrom('neonAuth.usersSync')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirstOrThrow();
  };

  return { getUser };
}
export const useRepository = (db: Database) => repository(db);
