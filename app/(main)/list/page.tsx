import AllLists from '@/app/components/List/AllLists';
import { createRepository } from '@/app/lib/repository';
import { stackServer } from '@/app/stack-server';
import Link from 'next/link';

export default async function ListPage() {
  const user = await stackServer.getUser({ or: 'return-null' });

  if (!user) {
    return (
      <div className="alert alert-warning text-3xl">
        You must{' '}
        <Link href="/handler/sign-in?after_auth_return_to=/list">sign in</Link>{' '}
        to view your lists.
      </div>
    );
  }

  const repository = createRepository();
  const userLists = await repository.getUserLists(user.id);

  return (
    <div className="h-full w-full flex flex-col p-2 gap-4">
      {' '}
      <h1 className="text-5xl">Mano sąrašai</h1>
      <div className="rounded-lg h-full gap-4 p-2 bg-black/60">
        <AllLists initialLists={userLists} />
      </div>
    </div>
  );
}
