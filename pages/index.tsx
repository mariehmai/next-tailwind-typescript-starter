import dynamic from 'next/dynamic';

import AgeGuesser from '../components/AgeGuesser';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

const Home = () => {
  return (
    <Layout>
      <button
        onClick={() => {
          throw new Error('OMAGAD!!!!!!!!!!!');
        }}
      >
        Click me
      </button>
      <AgeGuesser />
      <button
        onClick={() => {
          throw new Error('OMAGAD!!!!!!!!!!!');
        }}
      >
        Click me
      </button>
    </Layout>
  );
};

export default Home;
