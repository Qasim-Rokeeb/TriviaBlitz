'use client';

import { useState, useEffect } from 'react';
import type { Question } from '@/lib/types';
import GameHeader from './GameHeader';
import QuestionCard from './QuestionCard';

const QUESTION_TIME_LIMIT = 15; // seconds
const POINTS_PER_CORRECT = 100;
const POINTS_PER_SECOND = 10;
const POST_ANSWER_DELAY = 1500; // ms

type GameScreenProps = {
  questions: Question[];
  onGameEnd: (finalScore: number) => void;
  streak: number;
};

const GameScreen = ({ questions, onGameEnd, streak }: GameScreenProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

  const handleSelectAnswer = (selectedIndex: number, timeLeft: number) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswerIndex(selectedIndex);

    const isCorrect = selectedIndex === questions[currentQuestionIndex].correctAnswerIndex;
    let finalScore = score;

    if (isCorrect) {
      const newPoints = POINTS_PER_CORRECT + timeLeft * POINTS_PER_SECOND;
      finalScore += newPoints;
      setScore(finalScore);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsAnswered(false);
        setSelectedAnswerIndex(null);
      } else {
        onGameEnd(finalScore);
      }
    }, POST_ANSWER_DELAY);
  };
  
  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      <GameHeader
        score={score}
        streak={streak}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
      <QuestionCard
        key={currentQuestionIndex}
        question={currentQuestion}
        onAnswer={handleSelectAnswer}
        isAnswered={isAnswered}
        selectedAnswerIndex={selectedAnswerIndex}
        totalTime={QUESTION_TIME_LIMIT}
      />
    </div>
  );
};

export default GameScreen;
