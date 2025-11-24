type Props = {
  name: string;
  link: string;
  description?: string | null;
};

export default function Item({ name, link, description }: Props) {
  return (
    <div className="card card-md border-2 border-transparent bg-linear-to-tr from-slate-500/30 via-slate-800/50 to-slate-900/30 ">
      <div className="card-body bg-black/50 rounded">
        {' '}
        <h1 className="card-title text-2xl">{name}</h1>
        <p className="text-base">{description}</p>
        <a
          href={link}
          target="_blank"
          className="text-blue-600 hover:underline hover:text-violet-600 text-xl  mr-auto"
        >
          {link}
        </a>
      </div>
    </div>
  );
}
