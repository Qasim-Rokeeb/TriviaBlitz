'use client';

import { Button } from '@/components/ui/button';
import { BrainCircuit, Loader2, Zap } from 'lucide-react';

type StartScreenProps = {
  onStart: () => void;
  loading: boolean;
};

const StartScreen = ({ onStart, loading }: StartScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl bg-card shadow-2xl animate-fade-in">
      <div className="relative mb-4">
        <BrainCircuit className="w-24 h-24 text-primary" />
        <Zap className="absolute -bottom-2 -right-2 w-10 h-10 text-accent fill-accent" />
      </div>
      <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl md:text-7xl">
        TriviaBlitz
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Test your knowledge with five daily questions. Answer fast for a higher
        score!
      </p>
      <Button
        onClick={onStart}
        disabled={loading}
        size="lg"
        className="mt-8 px-10 py-6 text-lg font-bold"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating Questions...
          </>
        ) : (
          'Start Daily Challenge'
        )}
      </Button>
    </div>
  );
};

export default StartScreen;
