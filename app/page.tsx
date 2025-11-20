import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-3xl ml-auto mr-auto p-8 md:p-4">
      <h1 className=" z-10 text-4xl mb-2">Sveiki!</h1>

      <hr></hr>
      <div className="text-xl my-4">
        „Kam dovanosiu?“ – tai paprasta ir patogi slaptojo Kalėdų senelio
        (Secret Santa) programa, sukurta taip, kad ją būtų lengva naudoti bet
        kam.{' '}
        <p className="my-2">
          Spustelėję{' '}
          <Link
            className="text-blue-600 font-bold hover:text-violet-600"
            href="/list"
          >
            &quot;Sąrašai&quot;{' '}
          </Link>
          pamatysite šiuo metu aktyvius slaptojo Kalėdų senelio renginius. Ten
          rasite visus dalyvius ir jų pageidaujamų dovanų nuorodas.
        </p>
        <p className="my-4">
          Spustelėję
          <Link
            className="text-blue-600 font-bold hover:text-violet-600"
            href="/list"
          >
            {' '}
            &quot;Aš&quot;{' '}
          </Link>
          galėsite papildyti savo pageidaujamų dovanų sąrašus bei nuorodas.
        </p>
      </div>
    </main>
  );
}
