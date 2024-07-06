'use client';

import { useSearchParams } from 'next/navigation';
import { QuizSummary } from '@/components/QuizSummary';
import { sampleQuiz } from '@/lib/quiz-data';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const answers = JSON.parse(searchParams.get('answers') || '{}');

  return (
    <div className="container mx-auto p-4">
      <QuizSummary quiz={sampleQuiz} userAnswers={answers} />
    </div>
  );
}