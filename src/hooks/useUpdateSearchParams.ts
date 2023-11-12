import useRouter from './useRouter';
import usePathname from './usePathname';
import useSearchParams from './useSearchParams';

import { useCallback } from 'react';

export default function useUpdateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check if useSearchParams returned a valid value
  if (!searchParams) {
    throw new Error('Search params are not available.');
  }

  // Define a function to update search parameters
  const updateSearchParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      router.push(pathname + '?' + params.toString());
    },
    [router, pathname, searchParams]
  );

  return updateSearchParams;
}
