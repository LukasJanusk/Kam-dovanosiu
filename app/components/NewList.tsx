'use client';

import { useEffect, useRef, useState } from 'react';
import AddItemForm from './AddItemForm';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import { NewItem } from '../schema/item';
import EditItemForm from './EditItemForm';

type Props = {
  onSubmit: (items: NewItem[]) => void;
};
export default function NewList({ onSubmit }: Props) {
  const [items, setItems] = useState<Array<NewItem>>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<NewItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const editRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalOpen && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [modalOpen]);

  useEffect(() => {
    if (editModalOpen && editRef.current && !editRef.current.open) {
      editRef.current.showModal();
    }
  }, [editModalOpen]);

  return (
    <div className="bg-black/60 h-full w-full flex flex-col p-2 gap-4  rounded-lg">
      <ul>
        {items.map(item => (
          <li
            key={item.name}
            className="mt-4 p-4 border rounded-lg flex justify-between bg-black/50 gap-2 "
          >
            <h2 className="font-bold">{item.name}</h2>{' '}
            <span className="text-gray-500 hidden sm:block ml-auto">
              {item.url.length > 30
                ? item.url.substring(0, 30) + '...'
                : item.url}
            </span>
            <button
              onClick={() => {
                setEditItem(item);
                setEditModalOpen(true);
              }}
              className="group ml-auto"
            >
              <Edit className="hover:text-blue-700 duration-200 rotate-0 hover:rotate-5 transition-all " />
            </button>
            <button
              onClick={() => setItems(items.filter(i => i.name !== item.name))}
              className="group"
            >
              <Trash2 className="duration-200 rotate-0 transition-all hover:rotate-5 hover:text-red-700" />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-success self-start btn-lg"
      >
        <PlusCircle className="stroke-3" /> Pridėti dovaną
      </button>

      {items.length > 0 && (
        <button
          className="btn btn-xl btn-primary mt-auto mb-8"
          onClick={() => onSubmit(items)}
        >
          Pateikti sąrašą
        </button>
      )}

      <dialog ref={dialogRef} id="my_modal_1" className="modal">
        <div className="modal-box  max-w-2xl min-w-sm">
          <form method="dialog">
            <button
              onClick={() => setModalOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          <AddItemForm
            onSubmit={(item: NewItem) => {
              setItems(prev => [...prev, item]);
              setModalOpen(false);
              if (dialogRef.current?.open) {
                dialogRef.current.close();
              }
            }}
          />
        </div>
      </dialog>
      <dialog ref={editRef} id="my_modal_2" className="modal">
        <div className="modal-box  max-w-2xl min-w-sm">
          <form method="dialog">
            <button
              onClick={() => {
                setEditItem(null);
                setEditModalOpen(false);
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          {editItem && (
            <EditItemForm
              item={editItem!}
              onSubmit={(item: NewItem) => {
                setItems(prev =>
                  prev.filter(i => i.name !== editItem!.name).concat(item)
                );
                if (editRef.current?.open) {
                  editRef.current.close();
                }
                setEditItem(null);
                setEditModalOpen(false);
              }}
            />
          )}
        </div>
      </dialog>
    </div>
  );
}
