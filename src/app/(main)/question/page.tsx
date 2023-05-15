'use client';

import { useSupabase } from '@/components/supabase-provider';
import 'katex/dist/katex.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Latex from 'react-latex-next';

export default function QuestionPage() {
  const router = useRouter();
  const { session, supabase } = useSupabase();
  const [questionType, setQuestionType] = useState('text');
  const [questionInput, setQuestionInput] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const { error } = await supabase.from('questions').insert({
      created_by: session?.user.id,
      category: event.target.category.value,
      type: questionType,
      question: questionInput,
      answer: event.target.answer.value,
    });

    if (!error) router.back();
  };

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'type') {
      setQuestionInput('');
      setQuestionType(value);
    }

    if (name === 'questionText') {
      setQuestionInput(value);
    }

    if (name === 'questionLatex') {
      if (value) setQuestionInput(`$${value}$`);
      else setQuestionInput('');
    }
    if (name === 'questionUrl') setQuestionInput(value);
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
        <div className="border-2 border-dashed">
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
                name="questionText"
                className="block w-full rounded-md text-xl text-red-400"
              />
            )}
            {questionType === 'url' && (
              <>
                <input
                  type="url"
                  name="questionUrl"
                  className="block w-full rounded-md text-red-400"
                />
                {questionInput && !questionInput.includes('$') && (
                  <img
                    src={questionInput}
                    alt="Question image"
                    width={200}
                    height={200}
                    className="mt-2"
                  />
                )}
              </>
            )}
            {questionType === 'image' && (
              <input
                type="file"
                name="questionImage"
                className="block w-full rounded-md"
              />
            )}
            {questionType === 'draw' && (
              <input
                type="text"
                name="questionDraw"
                className="block w-full rounded-md"
              />
            )}
            {questionType === 'latex' && (
              <>
                <input
                  type="text"
                  name="questionLatex"
                  className="block w-full rounded-md text-red-400"
                />
                <div className="mt-3 overflow-scroll text-purple-500">
                  <Latex>{questionInput}</Latex>
                </div>
              </>
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
            className="h-11 w-full rounded-3xl bg-green-500 text-white"
          >
            POST
          </button>
        </div>
      </form>
    </div>
  );
}
