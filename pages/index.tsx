import dynamic from 'next/dynamic';

import AgeGuesser from '../components/AgeGuesser';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

const Home = () => {
  return (
    <Layout>
      <AgeGuesser />
    </Layout>
  );
};

export default Home;
