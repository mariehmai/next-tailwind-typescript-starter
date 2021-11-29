import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import { useSession, signIn, signOut } from 'next-auth/react';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Next.js app' }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (!session) {
    return (
      <div className="p-4">
        <span>Not signed in</span>
        <button
          className="ml-2 px-4 py-2 rounded border-gray-800 border-2 hover:shadow-md"
          type="button"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <div>
        <header className="flex flex-col m-4">
          <nav className="flex flex-col md:flex-row justify-between items-baseline">
            <span>
              <Link href="/">
                <a className="hover:opacity-80">Age Guesser</a>
              </Link>
            </span>
            <span className="flex flex-col md:flex-row justify-end md:items-center">
              <span>Signed in as {session.user?.name}</span>
              <button
                className="md:mx-2 px-4 py-2 rounded-md border-gray-800 border-2 hover:shadow-md"
                type="button"
                onClick={() => signOut()}
              >
                Sign out
              </button>
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
