'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const queryClient =  new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      refetchOnWindowFocus: false, // Prevent refetching on window focus
    }
  }
});

// Persist to localStorage
const persister = createSyncStoragePersister({
  storage: window.localStorage, // ✅ Stores cache in localStorage
});

persistQueryClient({
  queryClient,
  persister,
});

interface Providers {
  children: any
};

const ReactQueryProvider: React.FC<Providers> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
};

export default ReactQueryProvider;
