'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, RotateCcw } from 'lucide-react';

type ResultsScreenProps = {
  score: number;
  onPlayAgain: () => void;
};

const getMotivationalMessage = (score: number) => {
  if (score >= 1000) {
    return "Incredible! You're a true trivia master!";
  }
  if (score >= 750) {
    return "Fantastic score! You really know your stuff.";
  }
  if (score >= 500) {
    return "Great job! That's a very impressive score.";
  }
  if (score >= 250) {
    return "Nice one! Keep playing to sharpen your skills.";
  }
  return "Good effort! Every game is a chance to learn something new.";
};

const ResultsScreen = ({ score, onPlayAgain }: ResultsScreenProps) => {
  const motivationalMessage = getMotivationalMessage(score);

  return (
    <div className="w-full flex flex-col items-center gap-8 animate-fade-in">
      <Card className="w-full text-center shadow-lg">
        <CardHeader>
          <CardDescription>Challenge Complete!</CardDescription>
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-3">
            <Award className="w-10 h-10 text-yellow-500" />
            Your Score
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-6xl md:text-7xl font-extrabold text-accent">{score}</p>
          <p className="text-lg text-muted-foreground mt-2">{motivationalMessage}</p>
        </CardContent>
      </Card>

      <Button onClick={onPlayAgain} size="lg" className="mt-4">
        <RotateCcw className="mr-2 h-5 w-5" />
        New Challenge
      </Button>
    </div>
  );
};

export default ResultsScreen;
