'use client';

import { useSupabase } from '@/components/supabase-provider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Latex from 'react-latex-next';

export default function HomePage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!session) router.replace('/login');
  }, [session, router]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/api/questions', { cache: 'no-store' });
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
          <div className="h-1/5 flex-none overflow-x-auto">
            <div className="inline-flex h-full text-ellipsis p-1">
              {questions.map((question: any) => {
                return (
                  <div
                    className="mr-1 flex h-full w-32 flex-col items-center justify-evenly shadow"
                    key={question.id}
                  >
                    <div className="font-mono text-lg font-semibold capitalize text-slate-500">
                      {question.category}
                    </div>
                    {/* <div>{question.type}</div> */}
                    {question.type === 'text' && <div>{question.question}</div>}
                    {question.type === 'url' && (
                      <div>
                        <Image
                          src={question.question}
                          alt={question.category}
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
          <div className="grow bg-slate-400 shadow">Question Details</div>
        </div>

        {/* Small, Medium, and Large Device */}
        <div className="hidden h-full w-full space-x-2 p-2  md:flex">
          <div className="w-1/3 flex-none break-all bg-purple-400 shadow">
            Question List - {JSON.stringify(questions)}
          </div>
          <div className="grow bg-slate-400 shadow">Question Details</div>
        </div>
      </div>
    )
  );
}
