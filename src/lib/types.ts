import type { GenerateDailyTriviaOutput } from '@/ai/flows/generate-daily-trivia';

export type Question = GenerateDailyTriviaOutput['questions'][0];

// This can be removed as Leaderboard component is no longer used
export type LeaderboardEntry = {
  id: number;
  name: string;
  score: number;
  isCurrentUser?: boolean;
};
