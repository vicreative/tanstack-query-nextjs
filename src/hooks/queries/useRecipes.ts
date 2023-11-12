import {
  fetchRecipeDetails,
  fetchRecipeSimilar,
  fetchRecipes,
  fetchSavedRecipes,
} from '@data/recipes';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getNextPageParam,
  getPreviousPageParam,
} from '@utils/getQueryPageParam';

//  LIST ALL RECIPES

/**
 * Hook to fetch list of recipes
 * @param {number} pageParam
 * @param {number} limit
 * @param {string | string[]} query
 * @param {object} options
 * @returns list of recipes
 */
const useRecipes = (
  pageParam: number = 1,
  limit: number = 12,
  query: string | string[] = '',
  options: object = {}
) => {
  return useInfiniteQuery({
    queryKey: ['recipes', pageParam, limit, query],
    queryFn: () => fetchRecipes(pageParam, limit, query),
    initialPageParam: 1,
    refetchOnMount: false, // TODO: remove this
    refetchOnReconnect: false, // TODO: remove this
    refetchOnWindowFocus: false, // TODO: remove this
    ...options,
    getNextPageParam: (lastPage: any) => getNextPageParam(lastPage, pageParam),
    getPreviousPageParam: (firstPage: any) =>
      getPreviousPageParam(firstPage, pageParam),
  });
};

//  RECIPE DETAILS

/**
 * Hook to fetch Recipe Details
 * @param {string} id
 * @param {object} options
 * @returns
 */
const useRecipeDetails = (id: string, options: object = {}) => {
  return useQuery({
    queryKey: ['recipes', id],
    queryFn: () => fetchRecipeDetails(id),
    refetchOnMount: false, // TODO: remove this
    refetchOnReconnect: false, // TODO: remove this
    refetchOnWindowFocus: false, // TODO: remove this
    ...options,
  });
};

// LIST SIMILAR RECIPES

/**
 * Hook to fetch Similar recipes
 * @param {string} id
 * @param {number} limit
 * @param {object} options
 * @returns
 */
const useSimilarRecipe = (id: string, limit: number, options: object = {}) => {
  return useQuery({
    queryKey: ['similar-recipes', id, limit],
    queryFn: () => fetchRecipeSimilar(id, limit),
    refetchOnMount: false, // TODO: remove this
    refetchOnReconnect: false, // TODO: remove this
    refetchOnWindowFocus: false, // TODO: remove this
    ...options,
  });
};

// LIST SAVED RECIPES

/**
 * Hook to fetch list of recipes
 * @param {string} uid - user id
 * @param {number} pageParam
 * @param {number} limit
 * @param {string | string[]} query
 * @param {object} options
 * @returns list of saved recipes
 */
const useSavedRecipes = (
  uid: string,
  pageParam: number = 1,
  limit: number = 12,
  query: string | string[] = '',
  options: object = {}
) => {
  return useInfiniteQuery({
    queryKey: ['saved-recipes', uid, pageParam, limit, query],
    queryFn: () => fetchSavedRecipes(uid, pageParam, limit, query),
    initialPageParam: 1,
    refetchOnMount: false, // TODO: remove this
    refetchOnReconnect: false, // TODO: remove this
    refetchOnWindowFocus: false, // TODO: remove this
    ...options,
    getNextPageParam: (lastPage: any) => getNextPageParam(lastPage, pageParam),
    getPreviousPageParam: (firstPage: any) =>
      getPreviousPageParam(firstPage, pageParam),
  });
};

export { useRecipes, useRecipeDetails, useSimilarRecipe, useSavedRecipes };
