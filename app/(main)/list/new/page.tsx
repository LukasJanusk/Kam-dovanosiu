'use client';

import NewList from '@/app/components/List/NewList';
import { NewItem } from '@/app/schema/item';
import { useUser } from '@stackframe/stack';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';

export default function ListPage() {
  const searchParams = useSearchParams();
  const user = useUser();
  const eventId = searchParams.get('eventId');
  const router = useRouter();
  const userId = user?.id;
  const pathname = usePathname();
  const search = useSearchParams();
  const currentUrl = `${pathname}?${search.toString()}`;

  const handleListSubmit = async (items: NewItem[]) => {
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
      toast.warning('Event not found');
      return;
    }
    try {
      const response = await fetch('/api/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, userId, items }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.warning('Sąrašas jau sukurtas šiam renginiui', {
            action: (
              <Link
                className="btn btn-primary ml-auto"
                href={`/list/edit?listId=${data.id}`}
                onClick={() => toast.dismiss()}
              >
                Redaguoti
              </Link>
            ),
          });
        } else {
          toast.error(data.error ?? 'Klaida įkeliant sąrašą');
        }
        return;
      }

      toast.success('Sąrašas sėkmingai sukurtas');
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Klaida įkeliant sąrašą'
      );
    }
  };

  if (!userId) {
    return (
      <div className="flex flex-col gap-4 p-4 my-8 rounded-xl  max-w-sm justify-center items-center bg-black/50 ml-auto mr-auto">
        <h1 className="text-3xl text-white font-bold text-center">
          Prisijunkite norėdami sukurti sąrašą
        </h1>
        <Link
          className="btn btn-primary btn-xl"
          href={{
            pathname: '/handler/sign-in',
            query: { after_auth_return_to: currentUrl },
          }}
        >
          {' '}
          Prisijungti
        </Link>
      </div>
    );
  }

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
