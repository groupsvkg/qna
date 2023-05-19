'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSupabase } from '../../../components/supabase-provider';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function LoginPage() {
  const { supabase, session } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace('/');
      }
    };
    checkSession();
  });

  supabase.auth.onAuthStateChange((event) => {
    if (event == 'SIGNED_IN') {
      router.replace('/');
    }
  });

  return (
    !session && (
      <div className="flex h-screen items-center justify-center">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook', 'twitter', 'github']}
        />
      </div>
    )
  );
}
