'use client';

import { useRouter } from 'next/navigation';
import { useSupabase } from '../components/supabase-provider';
import Home from './home/page';
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

  return session ? <Home /> : <Login />;
}
