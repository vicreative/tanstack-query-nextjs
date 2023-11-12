import RecipeIcon from '@assets/Svgs/RecipeIcon';
import React from 'react';

type EmptyStateProps = {
  message: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No Results Found!',
}: EmptyStateProps) => {
  return (
    <div className='w-full flex flex-col items-center justify-center pt-20'>
      <RecipeIcon className='w-full md:w-1/3' />
      <p className='text-xl pt-4'>{message}</p>
    </div>
  );
};

export default EmptyState;
