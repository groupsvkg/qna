import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const revalidate = 0;

// eslint-disable-next-line no-unused-vars
export async function POST(request: Request, response: Response) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_KEY as string
  );
  const { user_id, question_id, answer } = await request.json();
  const { data } = await supabase
    .from('questions')
    .select()
    .eq('id', question_id)
    .eq('answer', answer);

  if (data?.length) {
    await supabase.from('history').upsert({
      user_id,
      question_id,
      updated_at: new Date(),
      status: 'SUCCESS',
    });
    return NextResponse.json({ data: { isCorrect: true } });
  }

  const history = await supabase
    .from('history')
    .select()
    .eq('user_id', user_id)
    .eq('question_id', question_id);

  await supabase.from('history').upsert({
    user_id,
    question_id,
    updated_at: new Date(),
    failed_attempt: history?.data?.length
      ? parseInt(history?.data[0].failed_attempt) + 1
      : 1,
    status: 'FAILED',
  });

  return NextResponse.json({ data: { isCorrect: false } });
}
