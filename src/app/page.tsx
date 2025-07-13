'use client';

import { useState } from 'react';
import { generateDailyTrivia } from '@/ai/flows/generate-daily-trivia';
import type { Question } from '@/lib/types';
import StartScreen from '@/components/game/StartScreen';
import GameScreen from '@/components/game/GameScreen';
import ResultsScreen from '@/components/game/ResultsScreen';
import { useToast } from '@/hooks/use-toast';

type GameState = 'start' | 'playing' | 'results';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
    setFinalScore(score);
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
          <GameScreen questions={questions} onGameEnd={handleGameEnd} />
        )}
        {gameState === 'results' && (
          <ResultsScreen score={finalScore} onPlayAgain={handlePlayAgain} />
        )}
      </div>
    </main>
  );
}
