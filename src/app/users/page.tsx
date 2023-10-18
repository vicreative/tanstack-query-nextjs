import { dehydrate } from '@tanstack/query-core';
import ListUsers from './list-users';
import getQueryClient from '@utils/getQueryClient';
import { fetchUsers } from '@hooks/queries/useUser';
import HydrationBoundary from '@hydration.client';

export default async function Users() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: ['users'], queryFn: fetchUsers });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ListUsers />
    </HydrationBoundary>
  );
}
