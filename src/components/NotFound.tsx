import React from 'react';
import Link from 'next/link';
import NotFoundIcon from '@assets/Svgs/NotFoundIcon';
import Button from './UI/Forms/Button';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full min-h-screen'>
      <div className='w-96 h-96 mb-2'>
        <NotFoundIcon />
      </div>
      <Link href='/'>
        <Button size='2xl' colorScheme='chimney' variant='filled'>
          Take me home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
