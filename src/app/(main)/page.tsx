'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSupabase } from '../../components/supabase-provider';

export default function HomePage() {
  const { session } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.replace('/login');
  }, [session, router]);

  return (
    session && (
      <div className="flex h-full bg-red-100 sm:bg-yellow-100 md:bg-blue-100">
        {/* Mobile Device */}
        <div className="flex h-full w-full flex-col space-y-2 bg-yellow-400 p-2 sm:hidden">
          <div className="basis-1/6 bg-purple-400 shadow">Question List</div>
          <div className="grow bg-slate-400 shadow">Question Details</div>
        </div>

        {/* Small, Medium, and Large Device */}
        <div className="hidden h-full w-full space-x-2 bg-yellow-400 p-2  sm:flex">
          <div className="basis-1/4 bg-purple-400 shadow">Question List</div>
          <div className="grow bg-slate-400 shadow">Question Details</div>
        </div>
      </div>
    )
  );
}
