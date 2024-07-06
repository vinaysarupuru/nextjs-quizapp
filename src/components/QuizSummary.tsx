// components/QuizSummary.tsx
// 'use client';

import React from 'react';
import { Quiz, Question } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, FileText, Award } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface QuizSummaryProps {
  quiz: Quiz;
  userAnswers: Record<string, string | string[]>;
}

export const QuizSummary: React.FC<QuizSummaryProps> = ({ quiz, userAnswers }) => {
  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (Array.isArray(question.correctAnswer)) {
        if (Array.isArray(userAnswer) && question.correctAnswer.every((a) => userAnswer.includes(a))) {
          score++;
        }
      } else if (userAnswer === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentageScore = parseFloat(((score / quiz.questions.length) * 100).toFixed(2));

  
  const downloadCSV = () => {
    let csvContent = "Question,Your Answer,Correct Answer\n";
    quiz.questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      csvContent += `"${question.question}","${userAnswer}","${question.correctAnswer}"\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "quiz_results.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Quiz Summary", 20, 10);
    autoTable(doc, {
        head: [['Question', 'Your Answer', 'Correct Answer']],
        body: quiz.questions.map((question) => [
          question.question,
          userAnswers[question.id],
          question.correctAnswer
        ]),
      });
    doc.save("quiz_summary.pdf");
  };

  const downloadCertificate = () => {
    const doc = new jsPDF();
    doc.text("Certificate of Completion", 105, 20, { align: 'center' });
    doc.text(`This is to certify that you have completed`, 105, 40, { align: 'center' });
    doc.text(`the "${quiz.title}" quiz`, 105, 50, { align: 'center' });
    doc.text(`with a score of ${score} out of ${quiz.questions.length}`, 105, 60, { align: 'center' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 80, { align: 'center' });
    doc.save("quiz_certificate.pdf");
  };

  const renderQuestion = (question: Question) => {

    const isCorrect = Array.isArray(question.correctAnswer) 
      ? question.correctAnswer.every((a) => userAnswers[question.id]?.includes(a))
      : userAnswers[question.id] === question.correctAnswer;

    const answerColor = isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  
    switch (question.type) {
      case 'radio':
      case 'singleSelect':
        return (
          <RadioGroup value={userAnswers[question.id] as string} disabled className="space-y-2">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className={`${option === question.correctAnswer ? 'text-green-600 dark:text-green-400 font-semibold' : 
                  (option === userAnswers[question.id] ? answerColor : '')}`}>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'multiSelect':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
               
                <Checkbox
                  id={option}
                  checked={(userAnswers[question.id] as string[])?.includes(option)}
                  disabled
                />
                <Label htmlFor={option} className={`${(question.correctAnswer as string[]).includes(option) ? 'text-green-600 dark:text-green-400 font-semibold' : 
                  ((userAnswers[question.id] as string[])?.includes(option) ? answerColor : 'text-red-600 dark:text-red-400')}`}>
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      case 'text':
        return (
          <div className="space-y-2">
            <Input value={userAnswers[question.id] as string} readOnly className={answerColor} />
            <p  className={`mt-2 ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}>Correct answer: {question.correctAnswer}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Quiz Summary</CardTitle>
          <CardDescription>
            You scored {score} out of {quiz.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={percentageScore} className="w-full" />
          <p className="text-xl font-semibold text-center">
            {percentageScore}% Correct
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={downloadCSV} variant="outline">
              <Download className="mr-2 h-4 w-4" /> CSV
            </Button>
            <Button onClick={downloadPDF} variant="outline">
              <FileText className="mr-2 h-4 w-4" /> PDF
            </Button>
            <Button onClick={downloadCertificate} variant="outline">
              <Award className="mr-2 h-4 w-4" /> Certificate
            </Button>
          </div>
        </CardContent>
      </Card>
      {quiz.questions.map((question, index) => (
        <Card key={question.id} className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">
              Question {index + 1}: {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderQuestion(question)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};