// components/QuizQuestion.tsx
import React, { useState, useEffect } from 'react';
import { Question } from '@/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: string | string[]) => void;
  currentAnswer?: string | string[];
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer, currentAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array.isArray(currentAnswer) ? currentAnswer : []
  );

  useEffect(() => {
    if (question.type === 'multiSelect') {
      setSelectedOptions(Array.isArray(currentAnswer) ? currentAnswer : []);
    }
  }, [question, currentAnswer]);

  const handleMultiSelectChange = (option: string, checked: boolean) => {
    setSelectedOptions(prev => {
      const newSelection = checked
        ? [...prev, option]
        : prev.filter(item => item !== option);
      onAnswer(newSelection);
      return newSelection;
    });
  };

  switch (question.type) {
    case 'radio':
    case 'singleSelect':
      return (
        <RadioGroup onValueChange={onAnswer} value={currentAnswer as string}>
          {question.options?.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    case 'multiSelect':
      return (
        <div className="space-y-2">
          {question.options?.map((option,optionIndex) => (
            <div key={optionIndex} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={selectedOptions.includes(option)}
                onCheckedChange={(checked) => handleMultiSelectChange(option, checked as boolean)}
              />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </div>
      );
    case 'text':
      return <Input onChange={(e) => onAnswer(e.target.value)} value={currentAnswer as string} />;
    default:
      return null;
  }
};