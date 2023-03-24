import '@/styles/globals.css';
import { useRef } from 'react';
import { queryClient } from '@/react-query/queryClient';
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import BasicLayout from '@/components/layout/BasicLayout';
import { getSession } from 'next-auth/react';

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

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { resolvedUrl } = context;

  // 인증 없어도 되는 경로
  const noAuthPaths = ['/', /^\/view\//];

  const shouldSkipAuth = noAuthPaths.some((path) => {
    if (typeof path === 'string') {
      return resolvedUrl.startsWith(path);
    } else if (path instanceof RegExp) {
      return path.test(resolvedUrl);
    }
    return false;
  });

  if (!shouldSkipAuth && !session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
