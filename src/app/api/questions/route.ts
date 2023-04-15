import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// eslint-disable-next-line no-unused-vars
export async function GET(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  const { data } = await supabase.rpc('list_questions');
  return NextResponse.json({ data });
}
