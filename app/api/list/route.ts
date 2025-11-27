import { NextRequest, NextResponse } from 'next/server';
import { createRepository } from '@/app/lib/repository';

export async function POST(req: NextRequest) {
  const { eventId, userId, items } = await req.json();
  const repo = createRepository();
  const list = await repo.createList({ eventId, userId }, items);

  return NextResponse.json(list);
}

export async function PUT(req: NextRequest) {
  const { listId, items } = await req.json();
  const repo = createRepository();
  const list = await repo.updateList(listId, items);

  return NextResponse.json(list);
}

export async function DELETE(req: NextRequest) {
  const { listId } = await req.json();
  const repo = createRepository();
  await repo.deleteList(listId);

  return NextResponse.json({ success: true });
}
