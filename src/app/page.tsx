'use client';

import { useState, useEffect } from 'react';
import { generateDailyTrivia } from '@/ai/flows/generate-daily-trivia';
import type { Question } from '@/lib/types';
import StartScreen from '@/components/game/StartScreen';
import GameScreen from '@/components/game/GameScreen';
import ResultsScreen from '@/components/game/ResultsScreen';
import { useToast } from '@/hooks/use-toast';
import { isToday, isYesterday } from 'date-fns';

type GameState = 'start' | 'playing' | 'results';

const STREAK_KEY = 'triviaBlitzStreak';
const LAST_PLAYED_KEY = 'triviaBlitzLastPlayed';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Load streak from localStorage on initial load
    const savedStreak = localStorage.getItem(STREAK_KEY);
    const lastPlayed = localStorage.getItem(LAST_PLAYED_KEY);

    if (savedStreak && lastPlayed) {
      const lastPlayedDate = new Date(lastPlayed);
      // Reset streak if the last play was not today or yesterday
      if (!isToday(lastPlayedDate) && !isYesterday(lastPlayedDate)) {
        setStreak(0);
        localStorage.setItem(STREAK_KEY, '0');
      } else {
        setStreak(parseInt(savedStreak, 10));
      }
    } else {
      setStreak(0);
    }
  }, []);

  const startGame = async () => {
    setIsLoading(true);
    try {
      const { questions: newQuestions } = await generateDailyTrivia({ topic: 'General Knowledge' });
      if (newQuestions && newQuestions.length > 0) {
        setQuestions(newQuestions);
        setGameState('playing');
      } else {
        throw new Error('Could not generate trivia questions.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to start the game. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGameEnd = (score: number) => {
    const lastPlayed = localStorage.getItem(LAST_PLAYED_KEY);
    let newStreak = 1; // Start with a streak of 1 for today's game

    if (lastPlayed) {
      const lastPlayedDate = new Date(lastPlayed);
      if (isYesterday(lastPlayedDate)) {
        // If last played was yesterday, increment streak
        newStreak = streak + 1;
      } else if (isToday(lastPlayedDate)) {
        // If already played today, streak doesn't change
        newStreak = streak;
      }
      // Otherwise, it resets to 1 (already set)
    }

    setStreak(newStreak);
    setFinalScore(score);
    localStorage.setItem(STREAK_KEY, newStreak.toString());
    localStorage.setItem(LAST_PLAYED_KEY, new Date().toISOString());
    setGameState('results');
  };

  const handlePlayAgain = () => {
    setQuestions([]);
    setFinalScore(0);
    setGameState('start');
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        {gameState === 'start' && (
          <StartScreen onStart={startGame} loading={isLoading} />
        )}
        {gameState === 'playing' && (
          <GameScreen questions={questions} onGameEnd={handleGameEnd} streak={streak} />
        )}
        {gameState === 'results' && (
          <ResultsScreen score={finalScore} onPlayAgain={handlePlayAgain} />
        )}
      </div>
    </main>
  );
}
