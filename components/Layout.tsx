import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTheme } from 'next-themes';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Next.js app' }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <header className="flex flex-col m-4">
          <nav className="flex flex-row justify-between items-baseline">
            <span>
              <Link href="/">
                <a className="hover:opacity-80">Age Guesser</a>
              </Link>{' '}
              |{' '}
              <Link href="/users">
                <a className="hover:opacity-80">Users List</a>
              </Link>{' '}
              |{' '}
              <a className="hover:opacity-80" href="/api/users">
                Users API
              </a>
            </span>
            <span className="flex justify-end ">
              <button
                className="flex items-center px-4 py-2 bg-gray-800 text-white font-bold rounded-md dark:bg-white dark:text-gray-800 drop-shadow-sm"
                onClick={switchTheme}
              >
                Switch theme
                <div
                  className={`h-4 w-4 ml-2 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}
                ></div>
              </button>
            </span>
          </nav>
        </header>
        {children}
      </div>
      <footer className="p-4 bg-gray-800 dark:bg-white text-center">
        <span className="text-xs text-white dark:text-gray-800">
          Next.js | Tailwind CSS
        </span>
      </footer>
    </div>
  );
};

export default Layout;
