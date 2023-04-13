import SupabaseListener from '../../components/supabase-listener';
import SupabaseProvider from '../../components/supabase-provider';
import { createServerClient } from '../../utils/supabase-server';
import '../globals.css';
import Navbar from './Navbar';

export const metadata = {
  title: 'QnA App',
  description: 'A Question and Answer App',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className="h-screen">
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          {session && <Navbar />}
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
