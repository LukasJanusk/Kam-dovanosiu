import { NextRequest, NextResponse } from 'next/server';
import { createRepository } from '@/app/lib/repository';

export async function POST(req: NextRequest) {
  const { eventId, userId, items } = await req.json();
  const repo = createRepository();

  const exist = await repo.getListByUserIdAndEventId(userId, Number(eventId));
  if (exist) {
    return NextResponse.json(
      { error: 'Šiam renginiui sąrašas jau sukurtas.', id: exist.id },
      { status: 409 }
    );
  }

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
  await repo.deleteList(Number(listId));

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  const listId = req.nextUrl.searchParams.get('listId');
  const eventId = req.nextUrl.searchParams.get('eventId');
  const repo = createRepository();
  if (userId) {
    const userLists = await repo.getUserLists(userId);

    return NextResponse.json(userLists);
  } else if (listId) {
    const list = await repo.getList(Number(listId));

    return NextResponse.json(list);
  } else if (eventId) {
    const eventLists = await repo.getListsByEventId(Number(eventId));

    return NextResponse.json(eventLists);
  }
}
