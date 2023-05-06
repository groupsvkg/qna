'use client';

import { useSupabase } from '@/components/supabase-provider';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import 'katex/dist/katex.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import Latex from 'react-latex-next';

export default function HomePage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [input, setInput] = useState<string[]>([]);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session) router.replace('/login');
  }, [session, router]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/api/questions');
      const { data } = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    divRef.current?.focus();
  }, [selectedQuestion]);

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

  const handleQuestionClick = (question: any) => {
    divRef.current?.focus();
    setInput([]);
    setSelectedQuestion(question);
  };

  return (
    session && (
      <div className="flex h-screen">
        {/* Mobile Device */}
        <div className="flex w-screen flex-col space-y-2 p-1 md:hidden">
          <div className="h-1/6 flex-none overflow-x-auto overflow-y-hidden border-b-2 scrollbar-hide ">
            <div className="inline-flex h-full p-1">
              {questions.map((question: any) => {
                return (
                  <div
                    className="mr-1 flex h-full w-32 flex-col items-center justify-evenly shadow"
                    key={question.id}
                    onClick={() => handleQuestionClick(question)}
                  >
                    <div className="w-full truncate text-center font-mono text-lg font-semibold capitalize text-slate-500">
                      {question.category}
                    </div>
                    {/* <div>{question.type}</div> */}
                    {question.type === 'text' && (
                      <div className="w-full truncate text-center text-3xl">
                        {question.question}
                      </div>
                    )}
                    {question.type === 'url' && (
                      <div className="w-full">
                        <Image
                          src={question.question}
                          alt={question.category}
                          fill
                        ></Image>
                      </div>
                    )}
                    {question.type === 'latex' && (
                      <div className="w-full overflow-hidden text-center">
                        <Latex>{question.question}</Latex>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Question Details for mobile or small device */}
          <div className="m-1 flex grow items-center justify-center shadow">
            {selectedQuestion === null && (
              <div className="text-gray-300">No question selected</div>
            )}
            {selectedQuestion !== null && (
              <div className="flex h-full w-full flex-col items-center justify-around">
                <div className="flex h-1/6 flex-col items-center justify-center">
                  {selectedQuestion.type === 'text' && (
                    <div className="w-full truncate text-center text-6xl">
                      {selectedQuestion.question}
                    </div>
                  )}
                  {selectedQuestion.type === 'url' && (
                    <div className="w-full">
                      <Image
                        src={selectedQuestion.question}
                        alt={selectedQuestion.category}
                        fill
                      ></Image>
                    </div>
                  )}
                  {selectedQuestion.type === 'latex' && (
                    <div className="w-full overflow-hidden text-center text-4xl">
                      <Latex>{selectedQuestion.question}</Latex>
                    </div>
                  )}
                </div>
                <div
                  ref={divRef}
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  className="flex h-8 w-full items-center justify-center focus:outline-none"
                >
                  {input.map((char, index) => (
                    <div
                      key={index}
                      className="m-1 flex h-6 w-6 items-center justify-center border-2 border-dashed border-orange-300 focus:outline-none"
                    >
                      {char}
                    </div>
                  ))}
                </div>

                {input.length === 0 && (
                  // <div className="text-3xl text-gray-300">Type to answer</div>
                  <div className="fixed bottom-40 flex w-screen justify-center text-4xl text-gray-200">
                    Type to answer...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Small, Medium, and Large Device */}
        <div className="hidden h-full w-full space-x-2 p-2  md:flex">
          <div className="w-1/6 flex-none break-all bg-purple-400 shadow">
            Question List - {JSON.stringify(questions, null, 2)}
          </div>
          <div className="grow bg-slate-100 shadow">Question Details</div>
        </div>

        <div className="fixed bottom-4 right-4 flex justify-end">
          <Link href="/question">
            <PlusCircleIcon className="h-16 w-16 text-green-500 hover:text-green-600" />
          </Link>
        </div>
      </div>
    )
  );
}
