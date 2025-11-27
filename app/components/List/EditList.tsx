'use client';

import { useState } from 'react';
import {
  PlusCircle,
  Trash2,
  Edit,
  AlertCircle,
  XCircle,
  CheckCircle,
  Info,
} from 'lucide-react';
import { Item, NewItem } from '../../schema/item';
import ItemModal from './ItemModal';
import { useUser } from '@stackframe/stack';

type Props = {
  listId: number;
  currentItems: Item[];
};
export default function EditList({ listId, currentItems }: Props) {
  const [items, setItems] = useState<Array<NewItem>>(currentItems);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    id: number;
    type: 'warning' | 'error' | 'success' | 'info';
    message: string;
  } | null>(null);

  const show = (
    type: 'warning' | 'error' | 'success' | 'info',
    message: string
  ) => {
    const id = Date.now();

    setToast({
      id,
      type,
      message,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const user = useUser();

  const handleAddItem = (item: NewItem) => {
    setItems(prev => [...prev, item]);
  };
  const handleEditItem = (item: NewItem) => {
    setItems(prev =>
      prev.map((i, index) => {
        if (index === editItemIndex) return item;
        return i;
      })
    );
    setEditItemIndex(null);
  };

  const handleSubmit = async () => {
    const userId = user?.id;
    if (!userId) {
      show('error', 'Vartotojas nerastas');
      return;
    }
    if (!listId) {
      show('error', 'Sąrašas nerastas');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch('/api/list', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listId, items }),
      });

      if (response.ok) {
        show('success', 'Sąrašas sėkmingai redaguotas');
      }
    } catch (err) {
      console.error(err);
      show('error', 'Nepavyko redaguoti sąrašo');
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/60 h-full w-full flex flex-col p-2 gap-4  rounded-lg">
      {toast && (
        <div className="toast toast-start toast-bottom text-xl">
          <div className={`alert alert-${toast.type}`}>
            {toast.type === 'warning' ? (
              <AlertCircle />
            ) : toast.type === 'error' ? (
              <XCircle />
            ) : toast.type === 'success' ? (
              <CheckCircle />
            ) : (
              <Info />
            )}{' '}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      <ul>
        {items.map((item, i) => (
          <li
            key={i}
            className="mt-4 p-4 border rounded-lg flex justify-between bg-black/50 gap-2 "
          >
            <h2 className="font-bold">{item.name}</h2>{' '}
            <span className="text-gray-500 hidden sm:block ml-auto">
              {item.url.length > 30
                ? item.url.substring(0, 30) + '...'
                : item.url}
            </span>
            <ItemModal
              onSubmit={handleEditItem}
              buttonStyles="ml-auto"
              onButtonClick={() => setEditItemIndex(i)}
              buttonIcon={
                <Edit className="hover:text-blue-700 duration-200 rotate-0 hover:rotate-5 transition-all " />
              }
              item={item}
            />
            <button
              onClick={() => setItems(items.filter(i => i.name !== item.name))}
              className="group"
            >
              <Trash2 className="duration-200 rotate-0 transition-all hover:rotate-5 hover:text-red-700" />
            </button>
          </li>
        ))}
      </ul>
      <ItemModal
        onSubmit={handleAddItem}
        buttonText="Pridėti dovaną"
        buttonIcon={<PlusCircle className="stroke-3" />}
        buttonStyles="btn btn-success btn-xl self-start"
      />
      {items.length > 0 && (
        <button
          className="btn btn-xl btn-primary mt-auto mb-8"
          onClick={handleSubmit}
        >
          Pateikti sąrašą{' '}
          {loading && <span className="loading loading-circle"></span>}
        </button>
      )}
    </div>
  );
}
