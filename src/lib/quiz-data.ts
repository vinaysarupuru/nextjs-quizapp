// lib/quiz-data.ts

import { Quiz } from '@/types';

export const sampleQuiz: Quiz = {
  id: '1',
  title: 'General Knowledge Quiz',
  questions: [
    {
      id: '1',
      type: 'radio',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      id: '2',
      type: 'multiSelect',
      question: 'Which of the following are primary colors?',
      options: ['Red', 'Green', 'Blue', 'Yellow'],
      correctAnswer: ['Red', 'Blue', 'Yellow'],
    },
    {
      id: '3',
      type: 'text',
      question: 'What is the largest planet in our solar system?',
      correctAnswer: 'Jupiter',
    },
    // Add more questions to reach a total of 10
  ],
};