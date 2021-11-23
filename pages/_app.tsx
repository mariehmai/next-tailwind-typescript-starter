import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      fetcher: (...args) => fetch(args).then((res) => res.json())
    }}
  >
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  </SWRConfig>
);

export default App;
