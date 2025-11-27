import { Item } from '../schema/item';
import ItemComponent from './Item';

type Props = {
  participantName: string;
  items: Item[];
};

export default function WishList({ participantName, items }: Props) {
  return (
    <div className="collapse collapse-arrow from-black/60 via-gray-800/90 to-gray-500/90 bg-linear-to-tr max-w-[1000px] ml-auto mr-auto ">
      <input type="checkbox" />
      <div className="collapse-title font-semibold text-xl ">
        {participantName}
      </div>
      <div className="collapse-content flex flex-col gap-2 ">
        {items.map(item => (
          <ItemComponent
            key={Number(item.id)}
            name={item.name}
            description={item.description}
            link={item.url}
          />
        ))}
      </div>
    </div>
  );
}
