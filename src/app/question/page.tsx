'use client';

import { useState } from 'react';

export default function Page() {
  const [questionType, setQuestionType] = useState('text');

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const handleChange = (event: any) => {
    if (event.target.name === 'type') setQuestionType(event.target.value);
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="w-2/5 space-y-6 rounded-md p-8 shadow-md"
      >
        <h1 className="text-3xl font-semibold text-gray-500">POST QUESTION</h1>
        <div>
          <label htmlFor="category" className="mb-1 block text-gray-500">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="block w-full rounded-md text-blue-500"
          />
        </div>
        <div className="h-36 border-2 border-dashed">
          <div className="m-1 text-gray-500">Question</div>
          <div className="flex justify-around">
            <label htmlFor="text" className="text-gray-400">
              <input
                type="radio"
                name="type"
                id="text"
                value="text"
                defaultChecked
              />{' '}
              text
            </label>
            <label htmlFor="url" className="text-gray-400">
              <input type="radio" name="type" id="url" value="url" /> url
            </label>
            <label htmlFor="image" className="text-gray-400">
              <input type="radio" name="type" id="image" value="image" /> image
            </label>
            <label htmlFor="draw" className="text-gray-400">
              <input type="radio" name="type" id="draw" value="draw" /> draw
            </label>
            <label htmlFor="latex" className="text-gray-400">
              <input type="radio" name="type" id="latex" value="latex" /> latex
            </label>
          </div>
          <div className="m-4">
            {questionType === 'text' && (
              <input
                type="text"
                name="question"
                className="block w-full rounded-md text-3xl text-red-400"
              />
            )}
            {questionType === 'url' && (
              <input
                type="url"
                name="question"
                className="block w-full rounded-md"
              />
            )}
            {questionType === 'image' && (
              <input
                type="file"
                name="question"
                className="block w-full rounded-md"
              />
            )}
            {questionType === 'draw' && (
              <input
                type="text"
                name="question"
                className="block w-full rounded-md"
              />
            )}
            {questionType === 'latex' && (
              <input
                type="text"
                name="question"
                className="block w-full rounded-md"
              />
            )}
          </div>
        </div>

        <div>
          <label htmlFor="answer" className="mb-1 block text-gray-500">
            Answer
          </label>
          <input
            type="text"
            id="answer"
            name="answer"
            className="block w-full rounded-md text-green-600"
          />
        </div>
        <div>
          <button
            type="submit"
            className="h-11 w-full rounded-3xl bg-blue-700 text-white"
          >
            POST QUESTION
          </button>
        </div>
      </form>
    </div>
  );
}
