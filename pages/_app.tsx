import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import { SWRConfig } from 'swr';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(args).then((res) => res.json())
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
);

export default App;
