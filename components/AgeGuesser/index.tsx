import React, { useState, KeyboardEvent } from 'react';

import AgeGuesserRQ from './AgeGuesserRQ';
import AgeGuesserSWR from './AgeGuesserSWR';

const AgeGuesser = () => {
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
    <div className="flex flex-col items-center p-4">
      <div className="mb-10 p-8 rounded-2xl border-gray-300 border-0 shadow-lg dark:text-gray-800 dark:bg-white">
        <h1 className="text-2xl">
          Predict the age of a person based on their name.
        </h1>
        <input
          className="w-full mt-8 px-4 py-2 rounded-md border-2 border-solid border-gray-300 dark:text-gray-800 dark:bg-white"
          placeholder="Type a name and press Enter... e.g. marie"
          type="text"
          value={name}
          onChange={onNameChange}
          onKeyDown={onNameKeyDown}
        />
      </div>
      {show && (
        <div className="flex flex-row">
          <AgeGuesserSWR name={name} />
          <AgeGuesserRQ name={name} />
        </div>
      )}
    </div>
  );
};

export default AgeGuesser;
