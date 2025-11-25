import WishList from '@/app/components/WishList';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventPage({ params }: Props) {
  const { id } = await params;

  // Get event from database using the id parameter
  // Get participants for the event and their lists
  // Get wishes list for each participant
  const eventName = 'Renginys - Kaledos 2025';
  const eventDescription =
    'Geriausias renginys metuose! Žemiau rasite visus dalyvius ir jų norus. Šių metų dovanų biudžetas --- 50 EUR.';
  const participants = [
    {
      id: '1',
      name: 'Dalyvis 1',
      items: [
        {
          id: '3123dasdf',
          item: 'Kojines',
          description: 'Vilnones',
          url: 'www.kazkokiaParduotuve.lt',
        },
      ],
    },
    {
      id: '2',
      name: 'Dalyvis 2',
      items: [
        {
          id: '3123da1sdf',
          item: 'Kojines',
          description: 'Vilnones',
          url: 'www.kazkokiaParduotuve.lt',
        },
        {
          id: '3123dasd3f',
          item: 'Lempa',
          description: 'Su stovu, auksta ir kokybiska',
          url: 'www.kazkokiaParduotuve.lt',
        },
        {
          id: '3123dadassdf',
          item: 'Kamera',
          description: 'Filmavimo labai gera ir nauja',
          url: 'www.kazkokiaParduotuve.lt',
        },
        {
          id: '3123dasfsadf',
          item: 'Telefonas',
          description: 'Geras',
          url: 'www.kazkokiaParduotuve.lt',
        },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap  md:p-8  gap-2 overflow-y-auto  max-w-full h-[calc(100vh-80px)] bg-linear-to-b from-transparent via-black-900/20 to-red-900/10">
      <div className="card card-lg w-full sm:card-sm">
        <div className="p-2">
          <h1 className="card-title text-5xl my-8">{eventName}</h1>
          <p className="p-4 rounded bg-amber-50/10 text-2xl">
            {eventDescription}
          </p>
          <div className="card-body flex">
            <ul className="flex flex-col gap-2 overflow-auto   rounded">
              {participants.map(participant => (
                <li key={participant.id}>
                  <WishList
                    participantName={participant.name}
                    items={participant.items}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
