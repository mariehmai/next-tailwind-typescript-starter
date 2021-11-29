import { useSession, signIn, signOut } from 'next-auth/react';
import dynamic from 'next/dynamic';

import AgeGuesser from '../components/AgeGuesser';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

const Home = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (session) {
    return (
      <Layout>
        <div className="p-4">
          <span>Signed in as {session.user?.name}</span>
          <button
            className="ml-2 px-4 py-2 rounded border-gray-800 border-2 hover:shadow-md"
            type="button"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
        <AgeGuesser />
      </Layout>
    );
  }

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
};

export default Home;
