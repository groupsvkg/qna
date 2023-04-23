import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const revalidate = 0;

// eslint-disable-next-line no-unused-vars
export async function GET(request: Request, response: Response) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_KEY as string
  );

  const { data } = await supabase
    .from('questions')
    .select(
      'id, created_by, created_at, category, type, question, profiles(*)'
    );
  return NextResponse.json({ data });
}
