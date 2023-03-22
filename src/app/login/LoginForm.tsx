import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSupabase } from '../../components/supabase-provider';

export default function LoginForm() {
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleEmailLogin = async (event: any) => {
    event.preventDefault();
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

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.log({ error });
    }
  };

  return (
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
      </form>
    </section>
  );
}
