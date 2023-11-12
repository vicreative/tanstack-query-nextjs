'use client';
import React from 'react';
import RecipeList from './RecipeList';
import { useRecipes } from '@hooks/queries/useRecipes';
import EmptyState from '@components/EmptyState';
import Loader from '@components/Loader';
import ErrorState from '@components/ErrorState';
import useSearchParams from '@hooks/useSearchParams';
import { Fade } from 'react-awesome-reveal';
import { autoCapitalizeFirstLetter } from '@utils/autoCapitalizeFirstLetter';
import SearchInput from '@components/UI/Forms/SearchInput';
import Pagination from '@components/Pagination';
import useUpdateSearchParams from '@hooks/useUpdateSearchParams';
import recipeList from '@constants/recipeList';
import { RecipesProps } from '@types';

const Recipes = ({ limit, query, pageParam }: RecipesProps) => {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const type = searchParams.get('type') || null;
  const searchQuery = type ? `&type=${type}${query}` : query;

  const { isLoading, isError, data, refetch } = useRecipes(
    pageParam,
    limit,
    searchQuery
    // { enabled: false } // TODO: remove this very important
  );

  const recipes = data?.pages[0];
  // const recipes = recipeList; // TODO: remove this very important

  return (
    <div className='mx-auto max-w-7xl pt-10 lg:pt-20 sm:pb-24 px-6'>
      <div className='max-w-lg mb-10 lg:mb-20'>
        <SearchInput />
      </div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorState
          message='An error occured while fetching recipes'
          onRetry={refetch}
        />
      ) : recipes?.totalResults <= 0 ? (
        <EmptyState message='No Results Found!' />
      ) : (
        <div>
          {type && (
            <Fade
              direction={'up'}
              delay={400}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <p className='text-2xl md:text-3xl pb-4 md:pb-6'>
                {autoCapitalizeFirstLetter(type)}
              </p>
            </Fade>
          )}

          <Fade
            direction={'up'}
            delay={type ? 800 : 400}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <RecipeList recipes={recipes} showSaveIcon />
          </Fade>

          <Fade
            direction={'up'}
            delay={type ? 1200 : 800}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <Pagination
              currentPage={recipes?.currentPage}
              totalCount={recipes?.totalResults}
              totalPages={recipes?.totalPages}
              pageSize={recipes?.number}
              onPageChange={(page) =>
                updateSearchParams('pageParam', page.toString())
              }
            />
          </Fade>
        </div>
      )}
    </div>
  );
};

export default Recipes;
