'use client';

import { ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSupabase } from '../../components/supabase-provider';

export default function Navbar() {
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) router.replace('/login');
  };

  return (
    <>
      {/* Mobile Device */}
      <div className="sticky z-40 flex h-10 items-center justify-between space-x-3 bg-green-600 p-1 text-white shadow sm:hidden">
        <div className="space-x-3">
          <Link href="/" className="text-2xl font-semibold">
            QnA
          </Link>
          <Link href="/">Home</Link>
        </div>
        <div className="right-0 flex space-x-1 pr-1 font-bold text-white">
          <UserIcon className="h-6 w-6" />
          <ArrowRightOnRectangleIcon
            className="h-6 w-6"
            onClick={handleSignout}
          />
        </div>
      </div>

      {/* Small, Medium, and Large Device */}
      <div className="sticky z-40 hidden h-10 items-center justify-between bg-green-600 p-1 text-white shadow sm:flex">
        <div className="space-x-3">
          <Link href="/" className="text-2xl font-semibold">
            QnA
          </Link>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/history">History</Link>
        </div>
        <div className="right-0 flex space-x-1 pr-1 font-bold text-white">
          <UserIcon className="h-6 w-6" />
          <ArrowRightOnRectangleIcon
            className="h-6 w-6"
            onClick={handleSignout}
          />
        </div>
      </div>
    </>
  );
}
