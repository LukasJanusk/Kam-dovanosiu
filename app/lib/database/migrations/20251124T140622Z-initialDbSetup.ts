/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .withSchema('public')
    .createTable('event')
    .ifNotExists()
    .addColumn('id', 'integer', c => c.primaryKey().generatedAlwaysAsIdentity())
    .addColumn('title', 'text', c => c.notNull())
    .addColumn('description', 'text', c => c.notNull())
    .execute();

  await db.schema
    .withSchema('public')
    .createTable('list')
    .ifNotExists()
    .addColumn('id', 'integer', c => c.primaryKey().generatedAlwaysAsIdentity())
    .addColumn('eventId', 'integer', c =>
      c.references('public.event.id').notNull()
    )
    .addColumn('userId', 'text', c =>
      c.references('neon_auth.users_sync.id').notNull()
    )
    .execute();

  await db.schema
    .withSchema('public')
    .createTable('item')
    .ifNotExists()
    .addColumn('id', 'integer', c => c.primaryKey().generatedAlwaysAsIdentity())
    .addColumn('name', 'text', c => c.notNull())
    .addColumn('description', 'text')
    .addColumn('url', 'text', c => c.notNull())
    .addColumn('listId', 'integer', c =>
      c.references('public.list.id').notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.withSchema('public').dropTable('item').ifExists().execute();
  await db.schema.withSchema('public').dropTable('list').ifExists().execute();
  await db.schema.withSchema('public').dropTable('event').ifExists().execute();
}
