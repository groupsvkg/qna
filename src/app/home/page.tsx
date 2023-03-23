import { useRouter } from 'next/navigation';
import { useSupabase } from '../../components/supabase-provider';

export default function Home() {
  const router = useRouter();
  const { supabase } = useSupabase();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    } else {
      router.push('/');
    }
  };
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="rounded-3xl border-b-8 border-b-amber-300 p-11 text-9xl font-bold text-green-300 shadow-lg hover:text-blue-300">
          TODO
        </h1>
      </div>
    </>
  );
}
