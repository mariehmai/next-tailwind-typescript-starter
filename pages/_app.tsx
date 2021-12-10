import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import * as Sentry from '@sentry/react';

import { SWRConfig } from 'swr';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../styles/index.css';
// import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function FallbackComponent() {
  return <div>An error has occured</div>;
}

const App = ({ Component, pageProps }: AppProps) => (
  <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog={false}>
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(args).then(res => res.json()),
        }}
      >
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <ThemeProvider attribute="class" defaultTheme="light">
            <Component {...pageProps} />
          </ThemeProvider>
        </QueryClientProvider>
      </SWRConfig>
    </SessionProvider>
  </Sentry.ErrorBoundary>
);

export default App;
