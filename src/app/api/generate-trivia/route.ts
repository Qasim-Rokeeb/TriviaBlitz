import { NextResponse } from 'next/server';
import { generateDailyTrivia } from '@/ai/flows/generate-daily-trivia';

export async function POST(req: Request) {
  const { topic } = await req.json();

  try {
    const result = await generateDailyTrivia({ topic });
    return NextResponse.json(result);
  } catch (error) {
    console.error('[generate-trivia] Error:', error);
    return NextResponse.json({ error: 'Failed to generate trivia' }, { status: 500 });
  }
}
