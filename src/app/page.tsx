import Image from "next/image";

import { QuizStart } from '@/components/QuizStart';
import { sampleQuiz } from '@/lib/quiz-data';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <QuizStart quizId={sampleQuiz.id} />
    </main>
  );
}
