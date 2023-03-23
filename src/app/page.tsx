'use client';

import { useSupabase } from '../components/supabase-provider';
import Home from './home/page';
import Login from './login/page';

export default function Page() {
  const { session } = useSupabase();

  return session ? <Home /> : <Login />;
}
