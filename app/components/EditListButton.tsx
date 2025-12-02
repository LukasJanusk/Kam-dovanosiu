import { Edit } from 'lucide-react';
import Link from 'next/link';

type Props = {
  listId: number;
};
export default function EditListButton({ listId }: Props) {
  return (
    <Link
      className={`btn btn-primary min-h-32 md:text-5xl text-3xl`}
      href={`/list/edit?listId=${listId}`}
    >
      Redaguoti savo sąrašą
      <Edit className="h-16 w-16" />{' '}
    </Link>
  );
}
