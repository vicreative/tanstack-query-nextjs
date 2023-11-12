import SavedRecipes from '@components/Recipes/SavedRecipes';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchSavedRecipes } from '@data/recipes';
import getQueryClient from '@app/getQueryClient';
import { getAuth } from 'firebase/auth';
import app from '@config/firebase';

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SavedRecipesPage({ searchParams }: PageProps) {
  const queryClient = getQueryClient();
  const auth = getAuth(app);

  const limit = 12;
  const pageParam = Number(searchParams.pageParam) || 1;
  const query = searchParams.q ? searchParams.q : '';

  await prefetchSavedRecipes(
    queryClient,
    auth.currentUser?.uid || '',
    pageParam,
    limit,
    query
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SavedRecipes limit={limit} query={query} pageParam={pageParam} />
    </HydrationBoundary>
  );
}
