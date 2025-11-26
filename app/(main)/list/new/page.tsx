'use client';

import NewList from '@/app/components/NewList';
import { NewItem } from '@/app/schema/item';
import { useUser } from '@stackframe/stack';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ListPage() {
  const searchParams = useSearchParams();
  const user = useUser();
  const eventId = searchParams.get('eventId');
  const [toast, setToast] = useState<string | null>(null);

  const handleListSubmit = async (items: NewItem[]) => {
    const userId = user?.id;
    if (!userId) {
      alert('User not logged in');
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
      setToast('Sąrašas sėkmingai sukurtas');
      setTimeout(() => setToast(null), 3000);
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
      <h1 className="text-3xl font-bold">Naujas sąrašas</h1>
      <NewList onSubmit={(items: NewItem[]) => handleListSubmit(items)} />
      {toast && (
        <div className="toast toast-start toast-bottom">
          <div className="alert alert-success">
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
