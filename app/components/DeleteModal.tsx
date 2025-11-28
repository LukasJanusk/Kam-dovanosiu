'use client';

import { Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  listId: number;
  onDelete: (listId: number) => void;
};

export default function DeleteModal({ listId, onDelete }: Props) {
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/list/delete', {
        method: 'DELETE',
        body: JSON.stringify({ listId }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        toast.success('Sąrašas ištrintas.');
      }
      onDelete(listId);
    } catch (err) {
      console.error(err);
      toast.error('Įvyko klaida ištrinant sąrašą.');
    } finally {
      setLoading(false);
      closeDialog();
    }
  };

  return (
    <>
      <button onClick={openDialog} disabled={loading}>
        <Trash2 className="hover:text-red-700 transition-all" />
      </button>{' '}
      <dialog ref={dialogRef} id="my_modal_3" className="modal">
        <div className="modal-box max-w-2xl min-w-sm">
          <button
            onClick={() => closeDialog()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl">Ištrinti visam laikui?</h1>
            <p className="text-red-400">Šio veiksmo negalima atšaukti!</p>
            <button className="btn btn-error ml-auto" onClick={handleDelete}>
              Ištrinti{' '}
              {loading && <span className="loading loading-ring"></span>}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
