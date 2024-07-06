export type QuestionType = 'multiSelect' | 'radio' | 'text' | 'singleSelect';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}