'use client';
import React from 'react';
import RecipeList from './RecipeList';
import { useSavedRecipes } from '@hooks/queries/useRecipes';
import EmptyState from '@components/EmptyState';
import Loader from '@components/Loader';
import ErrorState from '@components/ErrorState';
import useSearchParams from '@hooks/useSearchParams';
import { Fade } from 'react-awesome-reveal';
import SearchInput from '@components/UI/Forms/SearchInput';
import Pagination from '@components/Pagination';
import useUpdateSearchParams from '@hooks/useUpdateSearchParams';
import { RecipesProps } from '@types';
import { useUser } from '@hooks/context/useUser';

const SavedRecipes = ({ limit, query, pageParam }: RecipesProps) => {
  const {
    state: { user },
  } = useUser();
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const type = searchParams.get('type') || null;

  const {
    data: saved,
    isLoading,
    isError,
    refetch,
  } = useSavedRecipes(user?.uid || '', pageParam, limit, query);

  const recipes = saved?.pages[0];

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
        <EmptyState
          message={
            query.length ? 'No Results Found!' : `You have no saved recipes`
          }
        />
      ) : recipes ? (
        <div>
          <Fade
            direction={'up'}
            delay={type ? 800 : 400}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <RecipeList recipes={recipes} showDeleteIcon />
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
      ) : null}
    </div>
  );
};

export default SavedRecipes;
