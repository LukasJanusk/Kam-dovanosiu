'use client';
import Image from 'next/image';
import Link from 'next/link';
import ChristmasTree from '@/app/assets/christmas-tree.png';

type Props = {
  title: string;
  description?: string;
  id: number;
};

export default function EventCard({ title, description, id }: Props) {
  return (
    <div className="card card-side bg-linear-to-r from-red-900 via-base-200/90 to-base-300/90 via-40% shadow-sm  border-2 card-md md:card-xl  transition-all duration-200">
      <figure>
        <Image
          src={ChristmasTree}
          alt="Christmas tree max-width-38 max-height-92"
          width={200}
        />
      </figure>
      <div className="card-body gap-2">
        <h2 className="card-title text-3xl">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link href={`/event/${id}`} className="btn btn-primary">
            Atidaryti
          </Link>
        </div>
      </div>
    </div>
  );
}
