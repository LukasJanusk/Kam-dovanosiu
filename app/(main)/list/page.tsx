'use client';

import AllLists from '@/app/components/List/AllLists';
import { useUser } from '@stackframe/stack';
import Link from 'next/link';

export default function ListPage() {
  const user = useUser();

  const userId = user?.id;

  if (!userId) {
    return (
      <div className="alert alert-warning text-3xl rounded">
        <Link
          href="/handler/sign-in?after_auth_return_to=/list"
          className="btn btn-primary btn-xl"
        >
          Prisijunkite
        </Link>{' '}
        norėdami peržiūrėti savo sąrašus.
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col p-2 gap-4">
      {' '}
      <h1 className="text-5xl text-white">Mano sąrašai</h1>
      <div className="rounded-lg h-full gap-4 p-2 bg-black/60">
        <AllLists userId={userId} />
      </div>
    </div>
  );
}
