'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, List, User2 } from 'lucide-react';
import { UserButton } from '@stackframe/stack';

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className=" gap-2 text-3xl h-16 items-center flex justify-end  flex-1">
      <Link
        className={`btn btn-md text-2xl ${
          pathname === '/' ? 'text-blue-700' : ''
        }`}
        href={`/`}
      >
        <House />
        <span className="md:block hidden">Pradžia</span>
      </Link>
      <Link
        className={`btn btn-md text-2xl ${
          pathname === '/event' ? 'text-blue-700' : ''
        }`}
        href={`/event`}
      >
        <List />
        <span className="md:block hidden">Renginiai</span>
      </Link>
      <Link
        className={`btn btn-md text-2xl ${
          pathname === '/user' ? 'text-blue-700' : ''
        }`}
        href={`/user`}
      >
        <User2 />
        <span className="md:block hidden">Aš</span>
      </Link>
      <UserButton />
    </div>
  );
}
