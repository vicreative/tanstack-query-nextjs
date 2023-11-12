'use client';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';
import RecipeList from './RecipeList';
import { autoCapitalizeFirstLetter } from '@utils/autoCapitalizeFirstLetter';
import { useRecipes } from '@hooks/queries/useRecipes';
import Button from '@components/UI/Forms/Button';
import { RecipesProps } from '@types';

export default function RecipesType({
  limit = 4,
  type = 'breakfast',
  query = '',
  pageParam = 1,
}: RecipesProps) {
  const searchQuery = `&type=${type}${query}`;
  const { data } = useRecipes(
    pageParam,
    limit,
    searchQuery
    // { enabled: false } // TODO: remove this very important
  );
  const recipes = data?.pages[0];

  return (
    recipes && (
      <div className='mx-auto max-w-7xl pt-10 lg:pt-20 pb-8 px-6'>
        <Fade
          direction={'up'}
          delay={400}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          <div className='w-full flex justify-between items-center pb-4 md:pb-6'>
            <p className='text-2xl md:text-3xl'>
              {autoCapitalizeFirstLetter(type)}
            </p>
            <Button variant='accent' colorScheme='secondary'>
              <Link href={`/recipes?type=${type}`}>View all</Link>
            </Button>
          </div>
        </Fade>
        <RecipeList recipes={recipes} />
      </div>
    )
  );
}
