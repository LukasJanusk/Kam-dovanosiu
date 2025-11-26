import AddListButton from '@/app/components/AddListButton';
import WishList from '@/app/components/WishList';
import { createRepository } from '@/app/lib/repository';
import { stackServer } from '@/app/stack-server';
import { Edit } from 'lucide-react';
type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const repo = createRepository();
  const user = await stackServer.getUser({ or: 'null' });
  const userId = user?.id ?? null;

  const event = await repo.getEvent(Number(id));
  const participantsWithItems = await repo.getParticipantsWithItems(Number(id));

  const listExist = participantsWithItems.find(p => p.id === userId);

  return (
    <div className="flex flex-wrap  md:p-8  gap-2 overflow-y-auto  max-w-full">
      <div className="card card-lg w-full sm:card-sm">
        <div className="p-2">
          <h1 className="card-title text-5xl my-8">{event.title}</h1>
          <p className="p-4 rounded bg-amber-50/10 text-2xl ">
            {event.description}
          </p>
          <div className="card-body flex">
            <ul className="flex flex-col gap-2 overflow-auto rounded">
              {participantsWithItems.map(participant => (
                <li key={participant.id}>
                  <WishList
                    participantName={participant.name || 'Vardas'}
                    items={participant.items}
                  />
                </li>
              ))}
            </ul>
            {listExist ? (
              <button className="btn btn-primary btn-xl text-lg md:text-3xl py-8">
                Redaguoti savo sąrašą
                <Edit />{' '}
              </button>
            ) : (
              <AddListButton eventId={Number(id)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
