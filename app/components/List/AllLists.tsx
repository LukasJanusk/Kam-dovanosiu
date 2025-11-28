'use client';

import { Item } from '@/app/schema/item';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import DeleteModal from '../DeleteModal';

type Props = {
  initialLists: {
    listId: number;
    eventId: number;
    eventTitle: string;
    items: Item[];
  }[];
};
export default function AllLists({ initialLists }: Props) {
  const [lists, setLists] = useState(initialLists);

  const handleDeleted = (listId: number) => {
    setLists(prev => prev.filter(l => l.listId !== listId));
  };

  return (
    <>
      {lists.map(list => (
        <ul
          key={list.listId}
          className="list list-image-none min-w-sm bg-linear-to-tr from-gray-500/30 via-gray-500/50 to-gray-500/20  rounded-box shadow-md ml-auto mr-auto"
        >
          <li className="list-row w-full ">
            <h1 className="text-3xl">{list.eventTitle}</h1>
            <div className="flex flex-col gap-2 list-col-grow">
              {' '}
              {list.items.map(item => (
                <div className="flex gap-8" key={item.id}>
                  {' '}
                  <span>{item.name}</span>
                  <span className="text-gray-400 break-all sm:truncate max-w-full md:inline hidden">
                    {item.url.length > 50
                      ? item.url.slice(0, 47) + '...'
                      : item.url}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {' '}
              <Link type="button" href={`/list/edit?listId=${list.listId}`}>
                <Edit className="hover:text-blue-700 duration-200 rotate-0 hover:rotate-5 transition-all " />
              </Link>
              <DeleteModal listId={list.listId!} onDelete={handleDeleted} />
            </div>
          </li>
        </ul>
      ))}
    </>
  );
}
