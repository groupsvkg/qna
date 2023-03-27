'use client';

import { PlusCircleIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

export default function Home() {
  const [input, setInput] = useState<string[]>([]);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.focus();
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.key.length === 1) {
      if (input.length > 0 && input[input.length - 1] === '\u23ce') return;
      setInput([...input, event.key]);
    }

    if (event.key === 'Backspace') {
      setInput(input.slice(0, input.length - 1));
    }

    if (
      event.key === 'Enter' &&
      input.length > 0 &&
      input[input.length - 1] !== '\u23ce'
    ) {
      setInput([...input, '\u23ce']);
    }
  };

  return (
    <>
      <div
        ref={divRef}
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
      <div className="fixed bottom-4 right-4 flex w-screen justify-end">
        <PlusCircleIcon className="h-16 w-16 text-green-500 hover:text-green-600" />
      </div>
    </>
  );
}
