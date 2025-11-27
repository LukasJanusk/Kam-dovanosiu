import { Edit } from 'lucide-react';
import Link from 'next/link';

type Props = {
  listId: number;
  userId: string;
};
export default function EditListButton({ listId, userId }: Props) {
  return (
    <Link
      className={`btn btn-primary min-h-32 md:text-5xl text-3xl`}
      href={`/list/edit?listId=${listId}&?userId=${userId}`}
    >
      Redaguoti savo sąrašą
      <Edit className="h-16 w-16" />{' '}
    </Link>
  );
}
