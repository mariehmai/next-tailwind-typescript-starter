import { KeyboardEvent, useState } from 'react';

import Layout from '../components/Layout';
import AgeGuesserSWR from '../components/AgeGuesserSWR';

const IndexPage = () => {
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);

  const onNameChange = (e) => {
    setShow(false);
    setName(e.target.value);
  };

  const onNameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShow(true);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center p-4">
        <div className="mb-10 p-8 rounded-2xl border-gray-300 border-0 shadow-lg">
          <h1 className="text-2xl">
            Predict the age of a person based on their name.
          </h1>
          <input
            className="w-full mt-8 px-4 py-2 rounded-md border-2 border-solid border-gray-300"
            placeholder="Type a name... e.g. marie"
            type="text"
            value={name}
            onChange={onNameChange}
            onKeyDown={onNameKeyDown}
          />
        </div>
        {show && <AgeGuesserSWR name={name} />}
      </div>
    </Layout>
  );
};

export default IndexPage;
