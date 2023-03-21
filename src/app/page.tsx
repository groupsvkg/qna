'use client';

import { useRouter } from 'next/navigation';
import { useSupabase } from '../components/supabase-provider';
import Login from './login/page';

export default function Page() {
  const router = useRouter();
  const { supabase, session } = useSupabase();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    } else {
      router.push('/');
    }
  };

  return session ? (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={handleLogout} className="ml-10 bg-blue-600 shadow-sm">
        Logout
      </button>
    </>
  ) : (
    <Login />
  );
}
