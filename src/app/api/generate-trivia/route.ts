// import { NextResponse } from 'next/server';
// import { generateDailyTrivia } from '@/ai/flows/generate-daily-trivia';

// export async function POST(req: Request) {
//   const { topic } = await req.json();

//   try {
//     const result = await generateDailyTrivia({ topic });
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error('[generate-trivia] Error:', error);
//     return NextResponse.json({ error: 'Failed to generate trivia' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { generateDailyTrivia } from '@/ai/flows/generate-daily-trivia';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('[API] Received request with body:', body);

    const result = await generateDailyTrivia(body);
    console.log('[API] Trivia generated:', result);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[API] Error generating trivia:', error);
    return NextResponse.json({ error: 'Failed to generate trivia' }, { status: 500 });
  }
}
