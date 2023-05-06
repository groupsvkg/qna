'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSupabase } from '../../../components/supabase-provider';

export default function LoginPage() {
  const { supabase, session } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (session) router.replace('/');
  }, [session, router]);

  const handleEmailLogin = (event: any) => {
    event.preventDefault();

    const signIn = async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: event.target.email.value,
        password: event.target.password.value,
      });

      if (error) {
        console.log({ error });
      } else {
        router.replace('/');
      }
    };
    signIn();
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.log({ error });
    }
  };

  const handleFacebookLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    });

    if (error) {
      console.log({ error });
    }
  };

  return (
    !session && (
      <div className="flex h-screen items-center justify-center">
        <div className="flex h-3/4 w-4/5 flex-col rounded-md border-2 shadow-md md:h-1/2 md:w-1/2 md:flex-row">
          <section className="basis-1/2">
            <h1 className="m-2 text-3xl font-semibold text-gray-500">Login</h1>
            <form className="space-y-2 p-4" onSubmit={handleEmailLogin}>
              <div>
                <label htmlFor="email" className="text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="mb-6 block w-full rounded-md"
                />
              </div>
              <div className="flex justify-center space-x-2">
                <button
                  type="submit"
                  className="h-11 w-full  rounded-3xl bg-blue-700 text-white"
                >
                  Login
                </button>

                <button
                  type="button"
                  className="h-11 w-full rounded-3xl bg-green-700 text-white"
                >
                  <Link href={'/signup'}>Signup</Link>
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="h-11 w-full rounded-3xl bg-blue-700 text-white"
                  onClick={handleGoogleLogin}
                >
                  Google
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="h-11 w-full rounded-3xl bg-blue-700 text-white"
                  onClick={handleFacebookLogin}
                >
                  Facebook
                </button>
              </div>
            </form>
          </section>

          <section className="basis-1/2 bg-yellow-300"></section>
        </div>
      </div>
    )
  );
}
