'use client';
import React, { useEffect } from 'react';
import useRouter from '@hooks/useRouter';
import usePathname from '@hooks/usePathname';

import { useUser } from '@hooks/context/useUser';
import { storeCurrentRoute } from '@utils/auth';
import Loader from './Loader';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const {
    state: { isLoading, user },
  } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      storeCurrentRoute(pathname);
      router.replace('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user]);

  return (
    <>
      {isLoading ? (
        <main>
          <div className='flex w-full h-screen justify-center items-center'>
            <Loader />
          </div>
        </main>
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedRoute;
