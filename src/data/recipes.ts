// import api from '@services/api';
import e from '@constants/endpoints';
import { getNextPageParam } from '@utils/getQueryPageParam';
import { QueryClient } from '@tanstack/react-query';
import executeWithFallback from '@utils/executeWithFallback';
import { Recipe } from '@types';
import {
  addDocument,
  deleteDocument,
  getMultiplePaginatedDocuments,
} from './firestore';

//  LIST OF RECIPES

/**
 * Fetch List of Recipes
 * @param {number} pageParam
 * @param {number} limit
 * @param {string | string[]} query
 * @returns returns list of recipes
 */
async function fetchRecipes(
  pageParam: number = 1,
  limit: number = 12,
  query: string | string[] = ''
) {
  let data = { totalResults: 0 };
  const offset = (pageParam - 1) * limit;

  // data = await api.get(
  //   `${endpoint}&apiKey=${process.env.SPOONACULAR_API_KEY_1}`
  // );

  data = await executeWithFallback(
    `${e.RECIPES}?addRecipeInformation=true&fillIngredients=true&number=${limit}&offset=${offset}${query}`
  );

  const totalPages = Math.ceil(data.totalResults / limit);
  return {
    ...data,
    currentPage: pageParam,
    nextPage: pageParam === totalPages ? pageParam : pageParam + 1,
    prevPage: pageParam - 1,
    totalPages: totalPages,
  };
}

/**
 * Prefetch Paginated List of Recipes.
 * The results of this query will be cached like a normal query
 * @param {QueryClient} queryClient
 * @param {number} pageParam
 * @param {number} limit
 * @param {string | string[]} query
 */
async function prefetchRecipes(
  queryClient: QueryClient,
  pageParam: number = 1,
  limit: number = 12,
  query: string | string[] = ''
) {
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['recipes', pageParam, limit, query],
    queryFn: () => fetchRecipes(pageParam, limit, query),
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => getNextPageParam(lastPage, pageParam),
    pages: 1, // prefetch the first page
  });
}

//  RECIPE DETAILS

/**
 * Fetch Recipe Details
 * @param {string} id
 * @returns recipe details
 */
async function fetchRecipeDetails(id: string) {
  let data;

  data = await executeWithFallback(
    `${e.RECIPE_DETAILS(id)}?includeNutrition=false`
  );

  return data;
}

/**
 * Prefetch Recipe Details.
 * The results of this query will be cached like a normal query
 * @param {QueryClient} queryClient
 * @param {string} id
 * @param {boolean} shouldPrefetch
 *
 */
async function prefetchRecipeDetails(
  queryClient: QueryClient,
  id: string,
  shouldPrefetch: boolean = true
) {
  const options = {
    queryKey: ['recipes', id],
    queryFn: () => fetchRecipeDetails(id),
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
  };
  if (shouldPrefetch) {
    return await queryClient.prefetchQuery(options);
  } else {
    return await queryClient.fetchQuery(options);
  }
}

// LIST SIMILAR RECIPES

/**
 * Fetch Similar Recipes
 * @param {string} id
 * @param {number} limit
 * @returns similar Recipes
 */
async function fetchRecipeSimilar(id: string, limit: number) {
  let data;

  data = await executeWithFallback(`${e.SIMILAR_RECIPE(id)}?number=${limit}`);

  return data;
}

/**
 * Prefetch Similar Recipes.
 * The results of this query will be cached like a normal query
 * @param {QueryClient} queryClient
 * @param {string} id
 */
async function prefetchRecipeSimilar(
  queryClient: QueryClient,
  id: string,
  limit: number
) {
  await queryClient.prefetchQuery({
    queryKey: ['similar-recipes', id, limit],
    queryFn: () => fetchRecipeSimilar(id, limit),
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
  });
}

// SAVE RECIPE

/**
 * Function to Save Recipe in Database
 * @param {string} uid - user id
 * @param {Recipe} recipe
 */
async function saveRecipe(uid: string, recipe: Recipe) {
  return await addDocument(
    `users/${uid}/saved-recipes`,
    String(recipe.id),
    recipe
  );
}

/**
 * Function to Delete Save Recipe in Database
 * @param {string} uid - user id
 * @param {Recipe} recipeId
 */
async function deleteSavedRecipe(uid: string, recipeId: string) {
  return await deleteDocument(`users/${uid}/saved-recipes`, String(recipeId));
}

/**
 * Function to get Saved Recipes from Database
 * @param {string} uid - user id
 * @param {number} pageParam
 * @param {number} limit
 * @param {string | string[]} query
 *
 */
async function fetchSavedRecipes(
  uid: string,
  pageParam: number,
  limit: number,
  query: string | string[] = ''
) {
  let data = { totalResults: 0 };
  const offset = (pageParam - 1) * limit;

  data = await getMultiplePaginatedDocuments(
    `users/${uid}/saved-recipes`,
    offset,
    limit,
    query
  );

  const totalPages = Math.ceil(data.totalResults / limit);
  return {
    ...data,
    currentPage: pageParam,
    nextPage: pageParam === totalPages ? pageParam : pageParam + 1,
    prevPage: pageParam - 1,
    totalPages: totalPages,
  };
}

/**
 * Prefetch Saved Recipes.
 * The results of this query will be cached like a normal query
 * @param {QueryClient} queryClient
 * @param {number} pageParam
 * @param {number} limit
 * @param {string | string[]} query
 */
async function prefetchSavedRecipes(
  queryClient: QueryClient,
  uid: string,
  pageParam: number = 1,
  limit: number = 12,
  query: string | string[] = ''
) {
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['saved-recipes', uid, pageParam, limit, query],
    queryFn: () => fetchSavedRecipes(uid, pageParam, limit, query),
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => getNextPageParam(lastPage, pageParam),
    pages: 1, // prefetch the first page
  });
}

export {
  fetchRecipes,
  prefetchRecipes,
  fetchRecipeDetails,
  prefetchRecipeDetails,
  fetchRecipeSimilar,
  prefetchRecipeSimilar,
  saveRecipe,
  deleteSavedRecipe,
  fetchSavedRecipes,
  prefetchSavedRecipes,
};
