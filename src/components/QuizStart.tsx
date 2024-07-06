'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const QuizStart = ({ quizId }: { quizId: string }) => {
  const router = useRouter();

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Quiz!</h1>
      <Button onClick={() => router.push(`/quiz/${quizId}`)}>Start Quiz</Button>
    </div>
  );
};