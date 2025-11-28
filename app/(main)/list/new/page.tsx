'use client';

import NewList from '@/app/components/List/NewList';
import { NewItem } from '@/app/schema/item';
import { useUser } from '@stackframe/stack';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function ListPage() {
  const searchParams = useSearchParams();
  const user = useUser();
  const eventId = searchParams.get('eventId');
  const router = useRouter();

  const handleListSubmit = async (items: NewItem[]) => {
    const userId = user?.id;
    const returnTo = encodeURIComponent(`/list/new?eventId=${eventId}`);
    const signInUrl = `/handler/sign-in?after_auth_return_to=${returnTo}`;
    if (!userId) {
      toast.warning('Vartotojas nerastas.', {
        action: (
          <button
            className="btn ml-auto"
            onClick={() => router.push(signInUrl)}
          >
            Prisijungti
          </button>
        ),
      });

      return;
    }
    if (!eventId) {
      alert('Event not found');
      return;
    }

    const response = await fetch('/api/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, userId, items }),
    });
    if (response.ok) {
      toast.success('Sąrašas sėkmingai sukurtas');
    }
  };

  if (!eventId) {
    return (
      <div className="flex items-start justify-start gap-2 overflow-y-auto  max-w-full">
        <h1 className="text-3xl">Nenurodytas renginys</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start justify-start overflow-y-auto h-full  max-w-full gap-4 p-4">
      <h1 className="text-3xl font-bold text-white">Naujas sąrašas</h1>
      <NewList onSubmit={(items: NewItem[]) => handleListSubmit(items)} />
    </div>
  );
}
