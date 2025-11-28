'use client';

import { useState } from 'react';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import { Item, NewItem } from '../../schema/item';
import ItemModal from './ItemModal';
import { useUser } from '@stackframe/stack';
import { toast } from 'sonner';

type Props = {
  listId: number;
  currentItems: Item[];
};
export default function EditList({ listId, currentItems }: Props) {
  const [items, setItems] = useState<Array<NewItem>>(currentItems);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

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
      toast.warning('Vartotojas nerasts');
      return;
    }
    if (!listId) {
      toast.warning('Sąrašas nerastas');
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
        toast.success('Sąrašas sėkmingai redaguotas');
      }
    } catch (err) {
      console.error(err);
      toast.error('Klaida redaguojant sąrašą, kreipkitės į administratorių.');
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/60 h-full w-full flex flex-col p-2 gap-4  rounded-lg">
      <ul>
        {items.map((item, i) => (
          <li
            key={i}
            className="mt-4 p-4 border rounded-lg flex justify-between bg-black/30 gap-2 text-white"
          >
            <h2 className="font-bold">{item.name}</h2>{' '}
            <span className="text-white opacity-50 hidden sm:block ml-auto">
              {item.url.length > 30
                ? item.url.substring(0, 30) + '...'
                : item.url}
            </span>
            <ItemModal
              onSubmit={handleEditItem}
              buttonStyles="ml-auto"
              onButtonClick={() => setEditItemIndex(i)}
              buttonIcon={
                <Edit className="hover:text-blue-700 duration-200 rotate-0 hover:rotate-5 transition-all text-white " />
              }
              item={item}
            />
            <button
              onClick={() => setItems(items.filter(i => i.name !== item.name))}
              className="group"
            >
              <Trash2 className="duration-200 rotate-0 transition-all hover:rotate-5 hover:text-red-700 text-white" />
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
