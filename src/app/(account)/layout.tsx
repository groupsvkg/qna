import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import SupabaseListener from '../../components/supabase-listener';
import SupabaseProvider from '../../components/supabase-provider';
import { createServerClient } from '../../utils/supabase-server';
import '../globals.css';

export type TypedSupabaseClient = SupabaseClient;

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
      <body>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
