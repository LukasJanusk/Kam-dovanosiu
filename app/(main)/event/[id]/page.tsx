import AddListButton from '@/app/components/AddListButton';
import EditListButton from '@/app/components/EditListButton';
import WishList from '@/app/components/WishList';
import { createRepository } from '@/app/lib/repository';
import { stackServer } from '@/app/stack-server';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const repo = createRepository();
  const user = await stackServer.getUser({ or: 'return-null' });
  const userId = user?.id ?? null;

  const event = await repo.getEvent(Number(id));
  const participantsWithItems = await repo.getParticipantsWithItems(Number(id));

  const listExist = participantsWithItems.find(p => p.id === userId);

  return (
    <div className="flex flex-wrap md:p-8 gap-2 overflow-y-auto max-w-full text-white md:px-12">
      <div className="card card-lg w-full sm:card-sm">
        <div className="p-2">
          <div className="bg-linear-to-r from-black/20 via-black/40 to-black/20 flex items-center justify-center rounded-2xl flex-col ml-auto mr-auto max-w-3xl">
            <h1 className="card-title text-5xl my-8">{event.title}</h1>{' '}
            <p className="p-4 text-2xl">{event.description}</p>
          </div>

          <div className="card-body flex">
            <ul className="flex flex-col gap-2 rounded">
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
              <EditListButton listId={listExist.listId!} />
            ) : (
              <AddListButton eventId={Number(id)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
