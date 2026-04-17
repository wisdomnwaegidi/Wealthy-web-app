// Updated interfaces
export interface AssignmentType {
  _id: string;
  userId: string;
  subject: string;
  assignment: string;
  dueDate: string | Date;
  status: "completed" | "Pending" | "Not Started";
  questions: {
    questionNumber: number;
    questionText: string;
    options: {
      optionText: string;
      isCorrect: boolean;
    }[];
  }[];
  submittedAnswers?: {
    questionNumber: number;
    answer: string;
    isCorrect: boolean;
  }[];
}
