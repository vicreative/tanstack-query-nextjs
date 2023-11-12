import RecipeDetails from '@components/Recipes/RecipeDetails';
import { ResolvingMetadata } from 'next';
// import truncate from '@utils/truncate';
// import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
// import { prefetchRecipeDetails } from '@data/recipes';
// import getQueryClient from '@app/getQueryClient';

type PageProps = {
  params: { id: string };
};

// const queryClient = getQueryClient();

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
) {
  // const id = params.id;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  // try {
  //   const recipeDetails = await prefetchRecipeDetails(queryClient, id, false);

  //   return {
  //     title: `${recipeDetails.title} | Recipeshive`,
  //     description: truncate(recipeDetails.summary, 920),
  //     openGraph: {
  //       images: [recipeDetails.image, ...previousImages],
  //     },
  //   };
  // } catch (error: any) {
  return {
    title: 'Recipe Details | Recipeshive',
    description: `Your Culinary Destination for Endless Inspiration`,
    openGraph: {
      images: ['/images/Gallery/foodthree.jpg', ...previousImages],
    },
  };
  // }
}

export default async function RecipeDetailsPage() {
  // const dehydratedState = dehydrate(queryClient);

  return (
    <>
      {/* <HydrationBoundary state={dehydratedState}> */}
      <RecipeDetails />
      {/* </HydrationBoundary> */}
    </>
  );
}
