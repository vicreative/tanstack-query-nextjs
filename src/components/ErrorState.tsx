import ErrorIcon from '@assets/Svgs/ErrorIcon';
import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import Button from './UI/Forms/Button';

type ErrorStateProps = {
  message: string;
  onRetry: (options: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => void | Promise<UseQueryResult>;
};

const ErrorState = ({
  message = 'Something went wrong',
  onRetry,
}: ErrorStateProps) => {
  const handleRetry = () => {
    if (typeof onRetry === 'function') {
      onRetry({ throwOnError: false, cancelRefetch: true });
    }
  };

  return (
    <div className='flex flex-col w-full h-full min-h-360 justify-center items-center'>
      <ErrorIcon width={300} height={300} />
      <p className='text-xl pb-4 max-w-xs text-center'>{message}</p>
      <Button
        size='2xl'
        colorScheme='chimney'
        variant='filled'
        onClick={handleRetry}
      >
        Retry
      </Button>
    </div>
  );
};

export default ErrorState;
