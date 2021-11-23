import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

type Props = {
  name: string;
};

const AgeGuesserSWR = ({ name }: Props) => {
  const { data, error } = useSWR(`https://api.agify.io/?name=${name}`, fetcher);

  return (
    <div className="p-6 shadow-md rounded-2xl text-center">
      <h2>Fetching with SWR</h2>
      {error ? (
        <p>Oops!</p>
      ) : (
        <p className="text-8xl">
          {data?.age === undefined ? '...' : data?.age || '🤷🏻‍♀️'}
        </p>
      )}
    </div>
  );
};

export default AgeGuesserSWR;
