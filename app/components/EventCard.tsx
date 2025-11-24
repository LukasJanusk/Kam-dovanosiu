'use client';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  description?: string;
  id: string;
};

export default function EventCard({ title, description, id }: Props) {
  return (
    <div className="card card-side bg-base-100 shadow-sm  border-2 card-md md:card-xl hover:border-violet-600 transition-all duration-200">
      <figure>
        <Image
          src={`https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp`}
          alt="Movie"
          width={300}
          height={200}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link href={`/list/${id}`} className="btn btn-primary">
            Atidaryti
          </Link>
        </div>
      </div>
    </div>
  );
}
