type Props = {
  searchParams: { id?: string };
};

export default async function UserPage({ searchParams }: Props) {
  const { id } = await searchParams;
  if (!id) return <div>No user specified</div>;
  if (id !== '123') return <div>User not found</div>;
  return <div className="text-2xl text-white">User ID: {id}</div>;
}
