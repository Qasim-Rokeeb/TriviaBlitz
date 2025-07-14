import { NextResponse } from 'next/server';
import { generateDailyTrivia } from '@/ai/flows/generate-daily-trivia';

export async function POST(req: Request) {
  try {
    // Check if request has a body
    if (!req.body) {
      console.error('[API] No request body provided');
      return NextResponse.json({ error: 'No request body provided' }, { status: 400 });
    }

    const body = await req.json();
    console.log('[API] Received request with body:', body);

    // Validate that topic is provided
    if (!body.topic) {
      console.error('[API] No topic provided in request body');
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    console.log('[API] Generating trivia for topic:', body.topic);
    const result = await generateDailyTrivia(body);
    console.log('[API] Trivia generated successfully:', result);

    // Validate that the result has questions
    if (!result.questions || result.questions.length === 0) {
      console.error('[API] No questions generated');
      return NextResponse.json({ error: 'No questions generated' }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('[API] Error generating trivia:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('[API] Error message:', error.message);
      console.error('[API] Error stack:', error.stack);
    }

    return NextResponse.json({ 
      error: 'Failed to generate trivia',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Optional: Add a GET method for testing
export async function GET() {
  return NextResponse.json({ message: 'Trivia API is working' });
}