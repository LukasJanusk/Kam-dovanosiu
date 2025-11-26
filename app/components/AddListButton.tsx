'use client';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

type Props = {
  eventId: number;
};

export default function AddListButton({ eventId }: Props) {
  return (
    <Link
      className={`btn btn-success h-40 md:text-5xl text-3xl`}
      href={`/list/new?eventId=${eventId}`}
    >
      Pridėti savo dovanų sąrašą <PlusCircle className="h-24 w-24" />
    </Link>
  );
}
