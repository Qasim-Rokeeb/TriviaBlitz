'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, RotateCcw } from 'lucide-react';
import Leaderboard from './Leaderboard';

type ResultsScreenProps = {
  score: number;
  onPlayAgain: () => void;
};

const ResultsScreen = ({ score, onPlayAgain }: ResultsScreenProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-8 animate-fade-in">
      <Card className="w-full text-center shadow-lg">
        <CardHeader>
          <CardDescription>Daily Challenge Complete!</CardDescription>
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-3">
            <Award className="w-10 h-10 text-yellow-500" />
            Your Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-6xl md:text-7xl font-extrabold text-accent">{score}</p>
        </CardContent>
      </Card>

      <Leaderboard userScore={score} />

      <Button onClick={onPlayAgain} size="lg">
        <RotateCcw className="mr-2 h-5 w-5" />
        New Challenge
      </Button>
    </div>
  );
};

export default ResultsScreen;
