'use client';

import { useUser } from '@stackframe/stack';
import Link from 'next/link';

export default function UserPage() {
  const user = useUser();

  return (
    <div className="text-2xl text-white flex flex-col gap-4 sm:p-4 p-0 ml-auto mr-auto max-w-3xl">
      <div className="flex flex-col gap-2 bg-linear-to-r from-black/60 via-black/40 to-black/20 p-4 rounded">
        <h1 className="text-5xl mb-8">Vartotojo informacija:</h1>
        <span>
          <span className="text-bold text-3xl">Vartotojoi Id:</span> {user?.id}
        </span>
        <span>
          {' '}
          <span className="text-bold text-3xl">Vartotojo vardas:</span>{' '}
          {user?.displayName}
        </span>
        <span>
          <span className="text-bold text-3xl">El. paštas:</span>{' '}
          {user?.primaryEmail}
        </span>
      </div>
      <Link className="btn btn-xl btn-primary" href={`/list`}>
        Mano sąrašai
      </Link>
    </div>
  );
}
