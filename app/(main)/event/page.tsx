import EventCard from '@/app/components/EventCard';
import { createRepository } from '@/app/lib/repository';

export default async function ListPage() {
  const repository = createRepository();
  const events = await repository.getEvents();
  return (
    <div className="flex flex-wrap items-start p-8  justify-start gap-2 overflow-y-auto  max-w-full">
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
