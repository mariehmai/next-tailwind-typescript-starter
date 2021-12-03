import dynamic from 'next/dynamic';

import AgeGuesser from '../components/AgeGuesser';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

const Home = () => {
  return (
    <Layout>
      <button
        type="button"
        onClick={() => {
          throw new Error('Woooups!');
        }}
      >
        Throw error
      </button>
      <AgeGuesser />
    </Layout>
  );
};

export default Home;
