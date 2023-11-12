import Banner from '@components/Banner/index';
import Features from '@components/Features';
import RecipesType from '@components/Recipes/RecipesType';
import Navbar from '@components/Navbar/index';
import Footer from '@components/Footer/Footer';
import { prefetchRecipes } from '@data/recipes';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getQueryClient from './getQueryClient';
// import Newsletter from '@components/Newsletter/Newsletter';
// import Expert from '@components/Expert/index';
// import Gallery from '@components/Gallery/index';

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function HomePage({ searchParams }: PageProps) {
  const queryClient = getQueryClient();

  const limit = 4;
  const pageParam = Number(searchParams.pageParam) || 1;
  const query = searchParams.q
    ? `&sort=random&query=${searchParams.q}`
    : '&sort=random';

  await prefetchRecipes(queryClient, pageParam, limit, query);
  const dehydratedState = dehydrate(queryClient);

  return (
    <main>
      <HydrationBoundary state={dehydratedState}>
        <Navbar />
        <Banner />
        <RecipesType
          type='breakfast'
          limit={limit}
          query={query}
          pageParam={pageParam}
        />
        <RecipesType
          type='main course'
          limit={limit}
          query={query}
          pageParam={pageParam}
        />
        <RecipesType
          type='snack'
          limit={limit}
          query={query}
          pageParam={pageParam}
        />
        <Features />
        {/* <Newsletter /> */}
        {/* <Expert /> */}
        {/* <Gallery />  */}
        <Footer />
      </HydrationBoundary>
    </main>
  );
}
