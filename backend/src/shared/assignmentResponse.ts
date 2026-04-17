export interface SubmissionResponse {
  message: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  submittedAnswers: {
    questionNumber: number;
    answer: string;
    isCorrect: boolean;
  }[];
}
