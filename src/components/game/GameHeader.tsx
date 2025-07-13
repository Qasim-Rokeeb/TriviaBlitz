'use client';

import { Star, Flame, BrainCircuit } from 'lucide-react';

type GameHeaderProps = {
  score: number;
  streak: number;
  questionNumber: number;
  totalQuestions: number;
};

const GameHeader = ({
  score,
  streak,
  questionNumber,
  totalQuestions,
}: GameHeaderProps) => {
  return (
    <div className="flex justify-between items-center w-full text-primary mb-4 text-lg font-semibold">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
          <Star className="w-6 h-6 text-yellow-500" />
          <span>{score}</span>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
          <Flame className="w-6 h-6 text-orange-500" />
          <span>{streak}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
        <BrainCircuit className="w-6 h-6" />
        <span>
          {questionNumber} / {totalQuestions}
        </span>
      </div>
    </div>
  );
};

export default GameHeader;
