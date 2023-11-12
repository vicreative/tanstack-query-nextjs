import React, { useState } from 'react';
import Image from 'next/image';
import { BsAlarm, BsBookmarkDash, BsBookmarkPlus } from 'react-icons/bs';
import { MdOutlineBubbleChart } from 'react-icons/md';
import { Recipe, Recipes } from '@types';
import minutesToHoursAndMinutes from '@utils/minutesToHoursAndMinutes';
import Button from '@components/UI/Forms/Button';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '@hooks/context/useUser';
import {
  useDeleteSavedRecipe,
  useSaveRecipe,
} from '@hooks/mutations/useRecipes';
import useRouter from '@hooks/useRouter';

const RecipeList = ({
  recipes,
  showOnlyTitle = false,
  showSaveIcon = false,
  showDeleteIcon = false,
}: {
  recipes: Recipes;
  showOnlyTitle?: boolean;
  showSaveIcon?: boolean;
  showDeleteIcon?: boolean;
}) => {
  const {
    state: { user },
  } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState('');

  const { saveRecipe, saveRecipeState } = useSaveRecipe(user?.uid || '');

  const { deleteSavedRecipe, deleteSavedRecipeState } = useDeleteSavedRecipe(
    user?.uid || ''
  );

  const onSuccess = () => {
    setSelectedId('');
    queryClient.invalidateQueries({ queryKey: ['saved-recipes'] });
  };

  const handleSaveRecipe = (recipe: Recipe) => {
    const data = {
      ...recipe,
      addedAt: new Date().toISOString(),
    };
    saveRecipe(data, onSuccess);
  };

  const handleDeleteSavedRecipe = (recipeId: string) => {
    deleteSavedRecipe(recipeId, onSuccess);
  };

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 sm:gap-y-16 gap-x-3 sm:gap-x-5'>
      {recipes.results.map((recipe) => (
        <div
          key={recipe.id}
          className='rounded-xl h-full cursor-pointer'
          onClick={() => router.push(`/recipes/${recipe.id}`)}
        >
          <div className='relative w-full max-h-60 h-auto before:rounded-t-xl before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-black before:opacity-20'>
            <Image
              className='relative w-full max-h-60 h-auto rounded-t-xl z-0 mb-4'
              src={recipe.image}
              alt={recipe.title}
              width={180}
              height={180}
              priority
            />
            {showSaveIcon && (
              <Button
                isIcon
                variant='accent'
                colorScheme='primary'
                className='absolute right-4 top-4 z-50'
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(String(recipe.id));
                  handleSaveRecipe(recipe);
                }}
                disabled={
                  selectedId === String(recipe.id) && saveRecipeState.isPending
                }
              >
                <BsBookmarkPlus strokeWidth={0.2} />
              </Button>
            )}
            {showDeleteIcon && (
              <Button
                isIcon
                variant='accent'
                colorScheme='primary'
                className='absolute right-4 top-4 z-50'
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(String(recipe.id));
                  handleDeleteSavedRecipe(String(recipe.id));
                }}
                disabled={
                  selectedId === String(recipe.id) &&
                  deleteSavedRecipeState.isPending
                }
              >
                <BsBookmarkDash strokeWidth={0.2} />
              </Button>
            )}
          </div>
          {!showOnlyTitle && (
            <p className='text-sm sm:textmd md:text-lg text-gray-600 mb-1'>{`Source: ${recipe.sourceName}`}</p>
          )}
          <h2
            className={`text-md sm:text-xl md:text-2xl font-normal ${
              showOnlyTitle ? '' : 'truncate'
            }`}
          >
            {recipe.title}
          </h2>

          {!showOnlyTitle && (
            <div className='grid grid-cols-2 divide-x mt-4'>
              <div className='flex items-center gap-2'>
                <BsAlarm className='text-black text-opacity-50' />
                <p className='text-sm text-black text-opacity-50'>
                  {minutesToHoursAndMinutes(recipe.readyInMinutes)}
                </p>
              </div>
              <div className='flex items-center gap-2 pl-4'>
                <MdOutlineBubbleChart className='text-black text-opacity-50' />
                <p className='text-sm text-black text-opacity-50'>{`${recipe.missedIngredientCount} items`}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
