'use client';

import { Edit } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DeleteModal from '../DeleteModal';
import { parseParticipantLists, ParticipantList } from '@/app/schema/list';
import { toast } from 'sonner';

type Props = {
  userId: string;
};
export default function AllLists({ userId }: Props) {
  const [userLists, setUserLists] = useState<Array<ParticipantList>>([]);
  const [loading, setLoading] = useState(false);

  const handleDeleted = (listId: number) => {
    setUserLists(prev => prev.filter(l => l.listId !== listId));
  };

  useEffect(() => {
    const getLists = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/list?userId=${userId}`, {
          method: 'GET',
        });

        const data = await response.json();
        const parsed = parseParticipantLists(data);
        if (parsed.length < 1) {
          toast.info('Sąrašų nerasta');
        }
        setUserLists(parsed);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Serverio klaida.');
      } finally {
        setLoading(false);
      }
    };

    getLists();
  }, [userId]);

  return (
    <>
      {loading && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="loading loading-circle loading-xl" />
        </div>
      )}
      {userLists.map(list => (
        <ul
          key={list.listId}
          className="list list-image-none min-w-sm bg-linear-to-tr from-gray-500/30 via-gray-500/50 to-gray-500/20  rounded-box shadow-md ml-auto mr-auto"
        >
          <li className="list-row w-full ">
            <h1 className="text-3xl text-white">{list.eventTitle}</h1>
            <div className="flex flex-col gap-2 list-col-grow">
              {' '}
              {list.items.map(item => (
                <div className="flex gap-8" key={item.id}>
                  {' '}
                  <span className="text-white">{item.name}</span>
                  <span className="text-white opacity-50 break-all sm:truncate max-w-full md:inline hidden">
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
                <Edit className="hover:text-blue-700  text-slate-200 duration-200 rotate-0 hover:rotate-5 transition-all " />
              </Link>
              <DeleteModal listId={list.listId} onDelete={handleDeleted} />
            </div>
          </li>
        </ul>
      ))}
    </>
  );
}
