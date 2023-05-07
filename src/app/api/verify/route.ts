import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const revalidate = 0;

// eslint-disable-next-line no-unused-vars
export async function POST(request: Request, response: Response) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_KEY as string
  );
  const { id, answer } = await request.json();
  const { data } = await supabase
    .from('questions')
    .select()
    .eq('id', id)
    .eq('answer', answer);

  if (data?.length) return NextResponse.json({ data: { isCorrect: true } });

  return NextResponse.json({ data: { isCorrect: false } });
}
