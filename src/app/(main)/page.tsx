'use client';

import { useSupabase } from '@/components/supabase-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);

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
        <div className="flex h-full w-full flex-col space-y-2 bg-red-400 p-2 md:hidden">
          <div className="h-1/4 flex-none overflow-auto break-all bg-purple-400 shadow">
            <b className="text-yellow-800">Question List - </b>
            {JSON.stringify(questions)}
          </div>
          <div className="grow bg-slate-400 shadow">Question Details</div>
        </div>

        {/* Small, Medium, and Large Device */}
        <div className="hidden h-full w-full space-x-2 bg-blue-400 p-2  md:flex">
          <div className="w-1/3 flex-none break-all bg-purple-400 shadow">
            Question List - {JSON.stringify(questions)}
          </div>
          <div className="grow bg-slate-400 shadow">Question Details</div>
        </div>
      </div>
    )
  );
}
