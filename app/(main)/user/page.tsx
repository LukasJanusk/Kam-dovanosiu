'use client';

import { useUser } from '@stackframe/stack';

export default function UserPage() {
  const user = useUser();
  return (
    <div className="text-2xl text-white flex flex-col gap-4 p-4">
      <h1 className="text-5xl mb-8">USER DETAILS:</h1>
      <span>User ID: {user?.id}</span>
      <span>User name: {user?.displayName}</span>
      <span>User email: {user?.primaryEmail}</span>
    </div>
  );
}
