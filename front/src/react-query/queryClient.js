import { QueryClient } from '@tanstack/react-query';

const queryErrorHandler = (error) => {
  const content = error instanceof Error ? error?.response?.data : 'error';
  console.log(error);
  console.log(content);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 300000,
      cacheTime: 600000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
