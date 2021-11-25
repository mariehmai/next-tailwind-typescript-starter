import React from 'react';
import { useQuery, useQueryClient } from 'react-query';

const getAge = async ({ queryKey }) => {
  const response = await fetch(`https://api.agify.io/?name=${queryKey[0]}`);

  return response.json();
};

export const useGetAge = (name) => {
  return useQuery(name, getAge);
};

type Props = {
  name: string;
};

const Wrapper = ({ children }) => (
  <div className="p-6 shadow-md rounded-2xl text-center">
    <h2>Fetching with React Query</h2>
    {children}
  </div>
);

const AgeGuesserRQ = ({ name }: Props) => {
  useQueryClient();

  const { data, isLoading, error } = useGetAge(name);

  if (isLoading) {
    return (
      <Wrapper>
        <p className="text-8xl">...</p>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <p className="text-8xl">Oops!</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <p className="text-8xl">{data?.age || '🤷🏻‍♀️'}</p>
    </Wrapper>
  );
};

export default AgeGuesserRQ;
