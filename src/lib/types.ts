import type { GenerateDailyTriviaOutput } from '@/ai/flows/generate-daily-trivia';

export type Question = GenerateDailyTriviaOutput['questions'][0];

export type LeaderboardEntry = {
  id: number;
  name: string;
  score: number;
  isCurrentUser?: boolean;
};
