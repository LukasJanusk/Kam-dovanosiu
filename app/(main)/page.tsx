'use client';

import Link from 'next/link';
import { useUser } from '@stackframe/stack';

export default function Home() {
  const user = useUser();
  console.log('User on home page:', user);
  return (
    <main className="max-w-3xl ml-auto mr-auto p-8 md:p-4 bg-linear-to-r from-black/20 via-black/40 to-black/20 rounded-2xl m-8">
      <h1 className="text-white z-10 text-5xl mb-2 font-bold italic">
        Sveiki!
      </h1>
      <div className={`bg-white my-2 h-1 w-full px-4 rounded-full`} />
      <div className="text-xl my-4 text-white">
        „Kam dovanosiu?“ – tai paprasta ir patogi slaptojo Kalėdų senelio
        (Secret Santa) programa, sukurta taip, kad ją būtų lengva naudoti bet
        kam.{' '}
        <p className="my-2">
          Spustelėję{' '}
          <Link
            className="text-blue-600 font-bold hover:text-violet-600"
            href="/event"
          >
            &quot;Renginiai&quot;{' '}
          </Link>
          pamatysite šiuo metu aktyvius slaptojo Kalėdų senelio renginius. Ten
          rasite visus dalyvius ir jų pageidaujamų dovanų nuorodas.
        </p>
        <p className="my-4">
          Spustelėję{' '}
          <Link
            className="text-blue-600 font-bold hover:text-violet-600"
            href="/user"
          >
            &quot;Aš&quot;{' '}
          </Link>
          galėsite papildyti savo pageidaujamų dovanų sąrašus bei nuorodas.
        </p>
      </div>
    </main>
  );
}
