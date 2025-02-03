'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient =  new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      refetchOnWindowFocus: false, // Prevent refetching on window focus
    }
  }
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
