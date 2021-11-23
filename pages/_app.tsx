import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';

import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      fetcher: (...args) => fetch(args).then((res) => res.json())
    }}
  >
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  </SWRConfig>
);

export default App;
