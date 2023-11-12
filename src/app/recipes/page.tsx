import Recipes from '@components/Recipes';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchRecipes } from '@data/recipes';
import getQueryClient from '@app/getQueryClient';

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function RecipesPage({ searchParams }: PageProps) {
  const queryClient = getQueryClient();

  const limit = 12;
  const pageParam = Number(searchParams.pageParam) || 1;
  const query = searchParams.q ? `&query=${searchParams.q}` : '';

  await prefetchRecipes(queryClient, pageParam, limit, query);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Recipes limit={limit} query={query} pageParam={pageParam} />
    </HydrationBoundary>
  );
}
