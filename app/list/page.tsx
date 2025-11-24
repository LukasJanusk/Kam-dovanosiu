import EventCard from '@/app/components/EventCard';

export default function ListPage() {
  const events = [
    { id: '1', title: 'Kaledos 2023', description: 'Geriausios Kalėdos ever!' },
    { id: '2', title: 'Kaledos 2024', description: 'Geriausios Kalėdos ever!' },
    { id: '3', title: 'Kaledos 2025', description: 'Geriausios Kalėdos ever!' },
    { id: '4', title: 'Kaledos 2026', description: 'Geriausios Kalėdos ever!' },
    { id: '5', title: 'Kaledos 2023', description: 'Geriausios Kalėdos ever!' },
    { id: '6', title: 'Kaledos 2024', description: 'Geriausios Kalėdos ever!' },
    { id: '7', title: 'Kaledos 2025', description: 'Geriausios Kalėdos ever!' },
    { id: '8', title: 'Kaledos 2026', description: 'Geriausios Kalėdos ever!' },
    { id: '9', title: 'Kaledos 2023', description: 'Geriausios Kalėdos ever!' },
    {
      id: '10',
      title: 'Kaledos 2024',
      description: 'Geriausios Kalėdos ever!',
    },
    {
      id: '11',
      title: 'Kaledos 2025',
      description: 'Geriausios Kalėdos ever!',
    },
    {
      id: '12',
      title: 'Kaledos 2026',
      description: 'Geriausios Kalėdos ever!',
    },
    {
      id: '13',
      title: 'Kaledos 2023',
      description: 'Geriausios Kalėdos ever!',
    },
    {
      id: '14',
      title: 'Kaledos 2024',
      description: 'Geriausios Kalėdos ever!',
    },
    {
      id: '15',
      title: 'Kaledos 2025',
      description: 'Geriausios Kalėdos ever!',
    },
    {
      id: '16',
      title: 'Kaledos 2026',
      description: 'Geriausios Kalėdos ever!',
    },
  ];
  return (
    <div className="flex flex-wrap items-center p-8 h-[calc(100vh-80px)] justify-around gap-2 overflow-y-auto  max-w-full">
      {events.map(event => (
        <div key={event.id}>
          <EventCard
            id={event.id}
            title={event.title}
            description={event.description}
          />
        </div>
      ))}
    </div>
  );
}
