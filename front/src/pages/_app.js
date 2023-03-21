import '@/styles/globals.css';
import { useRef } from 'react';
import { queryClient } from '@/react-query/queryClient';
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import BasicLayout from '@/components/layout/BasicLayout';

export default function App({ Component, pageProps }) {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = queryClient;
  }
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <BasicLayout>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </BasicLayout>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}
