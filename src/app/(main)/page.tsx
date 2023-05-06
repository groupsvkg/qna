'use client';

import { useSupabase } from '@/components/supabase-provider';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import 'katex/dist/katex.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Latex from 'react-latex-next';

export default function HomePage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedQuestion, setSelectedQuestion] = useState(null);

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

  return (
    session && (
      <div className="flex h-full">
        {/* Mobile Device */}
        <div className="flex h-full w-full flex-col space-y-2 p-1 md:hidden">
          <div className="h-1/6 flex-none overflow-x-auto border-b-2">
            <div className="inline-flex h-full p-1">
              {questions.map((question: any) => {
                return (
                  <div
                    className="mr-1 flex h-full w-32 flex-col items-center justify-evenly shadow"
                    key={question.id}
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
                      <div>
                        <Latex>{question.question}</Latex>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="m-1 flex grow items-center justify-center shadow">
            {selectedQuestion === null && (
              <div className="text-gray-300">No question selected</div>
            )}
          </div>
        </div>

        {/* Small, Medium, and Large Device */}
        <div className="hidden h-full w-full space-x-2 p-2  md:flex">
          <div className="w-1/6 flex-none break-all bg-purple-400 shadow">
            Question List - {JSON.stringify(questions)}
          </div>
          <div className="grow bg-slate-100 shadow">Question Details</div>
        </div>

        <div className="fixed bottom-4 right-4 flex w-screen justify-end">
          <Link href="/question">
            <PlusCircleIcon className="h-16 w-16 text-green-500 hover:text-green-600" />
          </Link>
        </div>
      </div>
    )
  );
}
