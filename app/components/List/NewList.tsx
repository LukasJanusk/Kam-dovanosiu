'use client';

import { useState } from 'react';
import { Trash2, Edit, PlusCircle } from 'lucide-react';
import { NewItem } from '../../schema/item';
import ItemModal from './ItemModal';

type Props = {
  onSubmit: (items: NewItem[]) => void;
};
export default function NewList({ onSubmit }: Props) {
  const [items, setItems] = useState<Array<NewItem>>([]);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

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

  return (
    <div className="bg-black/60 h-full w-full flex flex-col p-2 gap-4  rounded-lg">
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
          onClick={() => onSubmit(items)}
        >
          Pateikti sąrašą
        </button>
      )}
    </div>
  );
}
