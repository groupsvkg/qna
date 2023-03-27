'use client';

import { useSupabase } from '../components/supabase-provider';
import Home from './home/Home';
import Login from './login/Login';

export default function Page() {
  const { session } = useSupabase();

  return session ? <Home /> : <Login />;
}
