type Props = {
  name: string;
  link: string;
  description?: string | null;
};

export default function Item({ name, link, description }: Props) {
  return (
    <div className="card card-lg border-2 border-transparent bg-linear-to-tr from-slate-400/50 via-slate-700/50 to-slate-900/30 ">
      <div className="card-body bg-black/50 rounded">
        {' '}
        <h1 className="card-title text-2xl">{name}</h1>
        <hr></hr>
        <p className="text-base text-gray-300">{description}</p>
        <a
          href={link}
          target="_blank"
          className="text-blue-600 hover:underline hover:text-violet-600 text-xl mr-auto wrap-break-words"
        >
          {link.length < 40 ? link : link.slice(0, 37) + '...'}
        </a>
      </div>
    </div>
  );
}
