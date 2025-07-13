'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { Question } from '@/lib/types';
import { motion } from "framer-motion";

type QuestionCardProps = {
  question: Question;
  onAnswer: (selectedIndex: number, timeLeft: number) => void;
  isAnswered: boolean;
  selectedAnswerIndex: number | null;
  totalTime: number;
};

const QuestionCard = ({
  question,
  onAnswer,
  isAnswered,
  selectedAnswerIndex,
  totalTime,
}: QuestionCardProps) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft <= 0) {
      onAnswer(-1, 0); // -1 signifies timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, onAnswer]);

  const getButtonVariant = (index: number) => {
    if (!isAnswered) {
      return 'secondary';
    }
    if (index === question.correctAnswerIndex) {
      return 'default'; // Will be styled green
    }
    if (index === selectedAnswerIndex) {
      return 'destructive';
    }
    return 'secondary';
  };
  
  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return 'bg-secondary hover:bg-secondary/80';
    }
    if (index === question.correctAnswerIndex) {
      return 'bg-green-500 hover:bg-green-600 animate-pulse text-white';
    }
    if (index === selectedAnswerIndex) {
      return 'bg-red-500 hover:bg-red-600 text-white';
    }
    return 'bg-secondary opacity-50';
  }

  return (
    <Card className="w-full shadow-2xl">
      <CardHeader>
        <Progress value={(timeLeft / totalTime) * 100} className="h-2 bg-accent/20 [&>div]:bg-accent" />
        <CardTitle className="pt-4 text-center text-xl md:text-2xl">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(index, timeLeft)}
              disabled={isAnswered}
              className={cn(
                'h-auto py-4 text-base whitespace-normal justify-start text-left transition-all duration-300 transform hover:scale-105',
                getButtonClass(index)
              )}
            >
              <span className="mr-4 font-bold text-accent">{String.fromCharCode(65 + index)}</span>
              <span>{option}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
