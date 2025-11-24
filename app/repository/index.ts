import { Database } from '../database';

export function repository(db: Database) {}
export const useRepository = (db: Database) => repository(db);
