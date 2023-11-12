import { deleteSavedRecipe, saveRecipe } from '@data/recipes';
import { useMutation } from '@tanstack/react-query';
import { Recipe } from '@types';
import { toast } from 'react-hot-toast';

/**
 * Hook to Save Recipe
 * @param {string} uid - user id
 *
 */
function useSaveRecipe(uid: string) {
  const saveRecipeRequest = (payload: Recipe) => saveRecipe(uid, payload);

  const { mutate, ...mutationState } = useMutation({
    mutationFn: saveRecipeRequest,
  });

  const saveRecipeFn = (
    payload: Recipe,
    onSuccess = (data: Recipe | void) => {},
    onError = (error: Error) => {}
  ) => {
    mutate(payload, {
      onSuccess: (data) => {
        toast.success(
          `Success! This recipe has been saved to your collection. You can access it in your "Saved Recipes" section whenever you like`
        );
        onSuccess(data);
      },
      onError: (error: any) => {
        if (error.code === 409) {
          toast.error('This recipe has already been added to your collection');
        } else {
          toast.error(error.message);
        }
        onError(error);
      },
    });
  };

  return { saveRecipe: saveRecipeFn, saveRecipeState: mutationState };
}

/**
 * Hook to Delete Saved Recipe
 * @param {string} uid - user id
 *
 */
function useDeleteSavedRecipe(uid: string) {
  const deleteSavedRecipeRequest = (recipeId: string) =>
    deleteSavedRecipe(uid, recipeId);

  const { mutate, ...mutationState } = useMutation({
    mutationFn: deleteSavedRecipeRequest,
  });

  const deleteSavedRecipeFn = (
    recipeId: string,
    onSuccess = () => {},
    onError = (error: Error) => {}
  ) => {
    mutate(recipeId, {
      onSuccess: () => {
        toast.success(
          `Success! This recipe has been removed from your collection.`
        );
        onSuccess();
      },
      onError: (error: any) => {
        toast.error(error.message);
        onError(error);
      },
    });
  };

  return {
    deleteSavedRecipe: deleteSavedRecipeFn,
    deleteSavedRecipeState: mutationState,
  };
}

export { useSaveRecipe, useDeleteSavedRecipe };
