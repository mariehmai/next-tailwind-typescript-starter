import React from 'react';
import useSWR from 'swr';

type Props = {
  name: string;
};

const AgeGuesserSWR = ({ name }: Props) => {
  const { data, error } = useSWR(`https://api.agify.io/?name=${name}`, null, {
    fallbackData: { age: '...' }
  });

  return (
    <div className="p-6 shadow-md rounded-2xl text-center mr-6">
      <h2>Fetching with SWR</h2>
      {error ? (
        <p className="text-8xl">Oops!</p>
      ) : (
        <p className="text-8xl">{data?.age || '🤷🏻‍♀️'}</p>
      )}
    </div>
  );
};

export default AgeGuesserSWR;
