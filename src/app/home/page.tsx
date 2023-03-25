'use client';

import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import { KeyboardEvent, useState } from 'react';

export default function Home() {
  const [input, setInput] = useState<string[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key.length === 1) {
      setInput([...input, event.key]);
    }

    if (event.key === 'Backspace') {
      setInput(input.slice(0, input.length - 1));
    }
  };

  return (
    <>
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex h-screen w-screen flex-col items-center justify-center focus:outline-none"
      >
        <div className="mb-20 h-40 w-40">
          <RocketLaunchIcon className="text-blue-500" />
        </div>
        <div className="flex h-6">
          {input.map((char, index) => (
            <div
              key={index}
              className="m-1 flex h-6 w-6 items-center justify-center border-2 border-dashed border-orange-300"
            >
              {char}
            </div>
          ))}
        </div>
      </div>
      {input.length === 0 && (
        <div className="fixed bottom-40 flex w-screen justify-center text-4xl text-gray-200">
          Type to answer...
        </div>
      )}
    </>
  );
}
