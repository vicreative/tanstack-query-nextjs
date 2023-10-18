import { dehydrate } from '@tanstack/query-core';
import ListUsers from './list-users';
import getQueryClient from '@app/shared/utils/getQueryClient';
import { fetchUsers } from '@app/shared/hooks/queries/useUser';
import HydrationBoundary from '@app/shared/hydration.client';

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
