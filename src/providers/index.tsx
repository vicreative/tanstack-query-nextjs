'use client';

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserProvider } from '@hooks/context/useUser';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import {
  PersistQueryClientProvider,
  removeOldestQuery,
} from '@tanstack/react-query-persist-client';
import { compress, decompress } from 'lz-string';
import useWindow from '@hooks/useWindow';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  const window = useWindow();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 1000 * 60 * 60 * 12, // 12 hours
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
          },
        },
      })
  );

  const persister = createSyncStoragePersister({
    storage: window?.localStorage,
    retry: removeOldestQuery,
    serialize: (data) => compress(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decompress(data)),
  });

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 12, // 12 hours
      }}
    >
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
      <UserProvider>{children}</UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
