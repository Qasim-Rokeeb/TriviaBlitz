'use client';

import { useState, useEffect } from 'react';
import sdk from "@farcaster/frame-sdk";
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

const TRIVIA_TOPICS = [
  'World History',
  'Science & Nature',
  'Movies & TV Shows',
  'Music',
  'Sports',
  'Geography',
  'Literature',
  'Art & Artists',
  'Technology',
  'Food & Drink',
  'Mythology',
  'Famous Inventions',
];

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [gameState, setGameState] = useState<GameState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  useEffect(() => {
    // Only run on client side
    if (!isClient) return;

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
  }, [isClient]);

  const startGame = async (topic: string) => {
    setIsLoading(true);
    try {
      console.log('Starting game with topic:', topic);
      
      const response = await fetch('/api/generate-trivia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response JSON:', data);

      if (data?.questions?.length > 0) {
        setQuestions(data.questions);
        setGameState('playing');
      } else {
        console.error('Invalid response data:', data);
        throw new Error(data?.error || 'No trivia questions returned.');
      }
    } catch (error) {
      console.error('Start game error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to start the game. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGameEnd = (score: number) => {
    // Only run on client side
    if (!isClient) return;

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

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl">
          <div className="text-center">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        {gameState === 'start' && (
          <StartScreen onStart={startGame} loading={isLoading} topics={TRIVIA_TOPICS} />
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