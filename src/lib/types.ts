import type { GenerateDailyTriviaOutput } from '@/ai/flows/generate-daily-trivia';

export type Question = GenerateDailyTriviaOutput['questions'][0];
