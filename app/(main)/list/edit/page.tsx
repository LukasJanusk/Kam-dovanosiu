import EditList from '@/app/components/List/EditList';
import { createRepository } from '@/app/lib/repository';
import { stackServer } from '@/app/stack-server';
import { AlertCircle } from 'lucide-react';

type Props = {
  searchParams: Promise<{ listId?: string }>;
};

export default async function EditListPage({ searchParams }: Props) {
  const params = await searchParams;

  const listId = params.listId;

  if (!listId)
    return (
      <div className="alert alert-warning text-3xl mr-auto ml-auto mt-8 flex gap-4 max-w-90">
        <AlertCircle className="h-16 w-16" /> Sąrašas nerastas.
      </div>
    );
  const repo = createRepository();
  const user = await stackServer.getUser({ or: 'return-null' });

  if (!user)
    return (
      <div className="alert alert-error text-3xl mr-auto ml-auto mt-8 flex gap-4 max-w-90">
        Leidimas atmestas.
      </div>
    );

  const items = await repo.getListItems(Number(listId));

  return (
    <div className="flex flex-col items-start justify-start overflow-y-auto h-full  max-w-full gap-4 p-4">
      <h1 className="text-3xl font-bold">Sąrašo redagavimas</h1>
      <EditList listId={Number(listId)} currentItems={items} />
    </div>
  );
}
