// 'use client';

// import React from 'react';
// import { Quiz, Question } from '@/types';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { jsPDF } from 'jspdf';

// import autoTable from 'jspdf-autotable';

// interface QuizSummaryProps {
//   quiz: Quiz;
//   userAnswers: Record<string, string | string[]>;
// }

// export const QuizSummary: React.FC<QuizSummaryProps> = ({ quiz, userAnswers }) => {
//   const calculateScore = () => {
//     let score = 0;
//     quiz.questions.forEach((question) => {
//       const userAnswer = userAnswers[question.id];
//       if (Array.isArray(question.correctAnswer)) {
//         if (Array.isArray(userAnswer) && question.correctAnswer.every((a) => userAnswer.includes(a))) {
//           score++;
//         }
//       } else if (userAnswer === question.correctAnswer) {
//         score++;
//       }
//     });
//     return score;
//   };

//   const score = calculateScore();

//   const downloadCSV = () => {
//     let csvContent = "Question,Your Answer,Correct Answer\n";
//     quiz.questions.forEach((question) => {
//       const userAnswer = userAnswers[question.id];
//       csvContent += `"${question.question}","${userAnswer}","${question.correctAnswer}"\n`;
//     });
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement("a");
//     if (link.download !== undefined) {
//       const url = URL.createObjectURL(blob);
//       link.setAttribute("href", url);
//       link.setAttribute("download", "quiz_results.csv");
//       link.style.visibility = 'hidden';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Quiz Summary", 20, 10);
//     autoTable(doc, {
//         head: [['Question', 'Your Answer', 'Correct Answer']],
//         body: quiz.questions.map((question) => [
//           question.question,
//           userAnswers[question.id],
//           question.correctAnswer
//         ]),
//       });
//     doc.save("quiz_summary.pdf");
//   };

//   const downloadCertificate = () => {
//     const doc = new jsPDF();
//     doc.text("Certificate of Completion", 105, 20, { align: 'center' });
//     doc.text(`This is to certify that you have completed`, 105, 40, { align: 'center' });
//     doc.text(`the "${quiz.title}" quiz`, 105, 50, { align: 'center' });
//     doc.text(`with a score of ${score} out of ${quiz.questions.length}`, 105, 60, { align: 'center' });
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 80, { align: 'center' });
//     doc.save("quiz_certificate.pdf");
//   };

//   const renderQuestion = (question: Question) => {
//     const isCorrect = Array.isArray(question.correctAnswer) 
//       ? question.correctAnswer.every((a) => userAnswers[question.id]?.includes(a))
//       : userAnswers[question.id] === question.correctAnswer;
    
//     const answerColor = isCorrect ? 'text-green-600' : 'text-red-600';

//     switch (question.type) {
//       case 'radio':
//       case 'singleSelect':
//         return (
//           <RadioGroup value={userAnswers[question.id] as string} disabled>
//             {question.options?.map((option) => (
//               <div key={option} className="flex items-center space-x-2">
//                 <RadioGroupItem value={option} id={option} />
//                 <Label htmlFor={option} className={option === question.correctAnswer ? 'text-green-600' : 
//                   (option === userAnswers[question.id] ? answerColor : '')}>
//                   {option}
//                 </Label>
//               </div>
//             ))}
//           </RadioGroup>
//         );
//       case 'multiSelect':
//         return (
//           <div>
//             {question.options?.map((option) => (
//               <div key={option} className="flex items-center space-x-2">
//                 <Checkbox
//                   id={option}
//                   checked={(userAnswers[question.id] as string[])?.includes(option)}
//                   disabled
//                 />
//                 <Label htmlFor={option} className={(question.correctAnswer as string[]).includes(option) ? 'text-green-600' : 
//                   ((userAnswers[question.id] as string[])?.includes(option) ? answerColor : '')}>
//                   {option}
//                 </Label>
//               </div>
//             ))}
//           </div>
//         );
//       case 'text':
//         return (
//           <div>
//             <Input value={userAnswers[question.id] as string} readOnly />
//             <p className={answerColor}>Correct answer: {question.correctAnswer}</p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <Card className="mb-4">
//         <CardHeader>
//           <CardTitle>Quiz Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>Your score: {score} out of {quiz.questions.length}</p>
//           <div className="flex space-x-2 mt-4">
//             <Button onClick={downloadCSV}>Download CSV</Button>
//             <Button onClick={downloadPDF}>Download PDF</Button>
//             <Button onClick={downloadCertificate}>Download Certificate</Button>
//           </div>
//         </CardContent>
//       </Card>
//       {quiz.questions.map((question) => (
//         <Card key={question.id} className="mb-4">
//           <CardHeader>
//             <CardTitle>{question.question}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {renderQuestion(question)}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };