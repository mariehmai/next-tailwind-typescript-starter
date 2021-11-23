import Link from 'next/link';

import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout>
    <div className="text-center">
      <h1 className="text:2xl">Dark mode with Tailwind and Next-themes</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </div>
  </Layout>
);

export default IndexPage;
