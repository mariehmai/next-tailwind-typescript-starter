import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class">
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
