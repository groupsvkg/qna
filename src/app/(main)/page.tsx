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
  const [isVerificationInProgress, setIsVerificationInProgress] =
    useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

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
    const verify = async () => {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          question_id: selectedQuestion.id,
          user_id: session?.user.id,
          answer: input.slice(0, -1).join(''),
        }),
      });

      const { data } = await response.json();
      if (data.isCorrect) setIsCorrect(true);
      else setIsCorrect(false);

      setIsVerificationInProgress(false);
    };

    if (input.includes('\u23ce')) verify();
  }, [input]);

  useEffect(() => {
    divRef.current?.focus();
    setIsCorrect(null);
  }, [selectedQuestion]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.key.length === 1) {
      if (input.length > 0 && input[input.length - 1] === '\u23ce') return;
      setInput([...input, event.key]);
    }

    if (event.key === 'Backspace') {
      setInput(input.slice(0, input.length - 1));
      setIsVerificationInProgress(false);
      setIsCorrect(null);
    }

    if (
      event.key === 'Enter' &&
      input.length > 0 &&
      input[input.length - 1] !== '\u23ce'
    ) {
      setInput([...input, '\u23ce']);
      setIsVerificationInProgress(true);
    }
  };

  const handleQuestionClick = (question: any) => {
    divRef.current?.focus();
    setIsCorrect(null);
    setInput([]);
    setSelectedQuestion(question);
  };

  return (
    session && (
      <div className="flex h-screen">
        {/* Mobile Device */}
        {/* <div className="flex w-screen flex-col space-y-2 p-1 md:hidden"> */}
        <div className="flex w-screen flex-col space-y-2 p-1">
          <div className="h-1/6 flex-none overflow-x-auto overflow-y-hidden border-b-2 scrollbar-hide ">
            <div className="inline-flex h-full p-1">
              {questions?.map((question: any) => {
                return (
                  <div
                    className={
                      selectedQuestion && selectedQuestion.id === question.id
                        ? 'mr-1 flex h-full w-32 flex-col items-center justify-evenly bg-gray-100 shadow'
                        : 'mr-1 flex h-full w-32 flex-col items-center justify-evenly shadow hover:cursor-pointer'
                    }
                    key={question.id}
                    onClick={() => handleQuestionClick(question)}
                  >
                    <div className="w-full truncate text-center font-mono text-lg font-semibold capitalize text-slate-500">
                      {question.category}
                    </div>
                    {/* <div>{question.type}</div> */}
                    {question.type === 'text' && (
                      <div className="w-full truncate text-center text-3xl text-slate-700">
                        {question.question}
                      </div>
                    )}
                    {question.type === 'url' && (
                      <div className="flex w-full items-center justify-center">
                        <Image
                          src={question.question}
                          alt={question.category}
                          width={64}
                          height={64}
                        ></Image>
                      </div>
                    )}
                    {question.type === 'latex' && (
                      <div className="w-full truncate text-center text-slate-700">
                        <Latex>{question.question}</Latex>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Question Details for mobile or small device */}
          <div
            ref={divRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="m-1 flex grow items-center justify-center shadow focus:outline-none"
          >
            {selectedQuestion === null && (
              <div className="text-gray-300">No question selected</div>
            )}
            {selectedQuestion !== null && (
              <div className="flex h-1/2 w-full flex-col items-center justify-around">
                <div className="flex h-full flex-col items-center justify-start">
                  {selectedQuestion.type === 'text' && (
                    <div className="w-full truncate text-center text-8xl text-slate-600">
                      {selectedQuestion.question}
                    </div>
                  )}
                  {selectedQuestion.type === 'url' && (
                    <div className="h-full w-full">
                      <Image
                        src={selectedQuestion.question}
                        alt={selectedQuestion.category}
                        width={500}
                        height={500}
                      ></Image>
                    </div>
                  )}
                  {selectedQuestion.type === 'latex' && (
                    <div className="w-full overflow-hidden text-center text-6xl">
                      <Latex>{selectedQuestion.question}</Latex>
                    </div>
                  )}
                </div>
                {/* Display user input */}
                <div className="flex h-8 w-full items-center justify-center focus:outline-none">
                  {input.map((char, index) => (
                    <div
                      key={index}
                      className="m-1 flex h-6 w-6 items-center justify-center border-2 border-dashed border-orange-300 focus:outline-none"
                    >
                      {char}
                    </div>
                  ))}
                  {isVerificationInProgress && (
                    <div>
                      <svg
                        className="ml-3 h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          fill="transparent"
                          stroke="purple"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="brown"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  )}
                  {isCorrect && (
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="green"
                      className="ml-3 h-5 w-5 animate-ping"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                  {isCorrect === false && (
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="red"
                      className="ml-3 h-5 w-5 animate-ping"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </div>

                {input.length === 0 && (
                  <div className="fixed bottom-40 flex w-screen justify-center text-4xl text-gray-200">
                    Type to answer...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Small, Medium, and Large Device */}
        {/* <div className="hidden h-full w-full space-x-2 p-2  md:flex">
          <div className="w-1/6 flex-none break-all bg-purple-400 shadow">
            Question List - {JSON.stringify(questions, null, 2)}
          </div>
          <div className="grow bg-slate-100 shadow">Question Details</div>
        </div> */}

        <div className="fixed bottom-4 right-4 flex justify-end">
          <Link href="/question">
            <PlusCircleIcon className="h-16 w-16 text-green-500 hover:text-green-600" />
          </Link>
        </div>
      </div>
    )
  );
}
