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
        Home Page
      </div>
    )
  );
}
