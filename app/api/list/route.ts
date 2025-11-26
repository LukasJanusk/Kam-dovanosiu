import { NextRequest, NextResponse } from 'next/server';
import { createRepository } from '@/app/lib/repository';

export async function POST(req: NextRequest) {
  const { eventId, userId, items } = await req.json();
  const repo = createRepository();
  const list = await repo.createList({ eventId, userId }, items);
  return NextResponse.json(list);
}
