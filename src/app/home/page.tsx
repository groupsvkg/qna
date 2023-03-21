import { useRouter } from 'next/navigation';
import { useSupabase } from '../../components/supabase-provider';

export default function Home() {
  const router = useRouter();
  const { supabase, session } = useSupabase();
  console.log(session);

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
      <h1>Home Page!</h1>
      <button onClick={handleLogout} className="ml-10 bg-blue-600 shadow-sm">
        Logout
      </button>
    </>
  );
}
