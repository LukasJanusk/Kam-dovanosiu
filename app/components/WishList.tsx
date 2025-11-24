import ItemComponent from './Item';

type Props = {
  participantName: string;
  items: { id: string; url: string; description?: string; item: string }[];
};

export default function WishList({ participantName, items }: Props) {
  return (
    <div className="collapse collapse-arrow from-violet-500/30 via-violet-800/50 to-violet-900/30 bg-linear-to-tr max-w-[1000px] ml-auto mr-auto">
      <input type="checkbox" />
      <div className="collapse-title font-semibold text-xl">
        {participantName}
      </div>
      <div className="collapse-content flex flex-col gap-2">
        {items.map(item => (
          <ItemComponent
            key={item.id}
            name={item.item}
            description={item.description}
            link={item.url}
          />
        ))}
      </div>
    </div>
  );
}
