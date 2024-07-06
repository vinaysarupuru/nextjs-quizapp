'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizLayout } from '@/components/QuizLayout';
import { sampleQuiz } from '@/lib/quiz-data';

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({});

  const handleAnswer = (answer: string | string[]) => {
    setUserAnswers((prev) => ({
      ...prev,
      [sampleQuiz.questions[currentQuestionIndex].id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    router.push(`/results?answers=${JSON.stringify(userAnswers)}`);
  };

  return (
    <div className="container mx-auto p-4">
      <QuizLayout
              quiz={sampleQuiz}
              currentQuestionIndex={currentQuestionIndex}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onFinish={handleFinish} userAnswers={userAnswers}      />
    </div>
  );
}
