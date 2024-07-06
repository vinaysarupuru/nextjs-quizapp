// components/QuizLayout.tsx
import React from 'react';
import { Quiz } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuizQuestion } from './QuizQuestion';

interface QuizLayoutProps {
  quiz: Quiz;
  currentQuestionIndex: number;
  onAnswer: (answer: string | string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
  userAnswers: Record<string, string | string[]>;
}

export const QuizLayout: React.FC<QuizLayoutProps> = ({
  quiz,
  currentQuestionIndex,
  onAnswer,
  onNext,
  onPrevious,
  onFinish,
  userAnswers,
}) => {
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </h2>
        <QuizQuestion 
          question={currentQuestion} 
          onAnswer={onAnswer} 
          currentAnswer={userAnswers[currentQuestion.id]}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onPrevious} disabled={currentQuestionIndex === 0} variant="outline">
          Previous
        </Button>
        {currentQuestionIndex === quiz.questions.length - 1 ? (
          <Button onClick={onFinish}>Finish</Button>
        ) : (
          <Button onClick={onNext}>Next</Button>
        )}
      </CardFooter>
    </Card>
  );
};