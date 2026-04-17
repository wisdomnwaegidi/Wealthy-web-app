import React from "react";

interface QuestionType {
  category: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  answers: string[];
}

interface QuestionProps {
  question: QuestionType;
  index: number;
  onGuessAnswer: (guess: string) => void;
  showCorrectAnswer: boolean;
}

const Question: React.FC<QuestionProps> = ({
  question,
  index,
  onGuessAnswer,
  showCorrectAnswer,
}) => {
  const allAnswers = [
    question.correctAnswer,
    ...question.incorrectAnswers,
  ].sort((a, b) => (a < b ? -1 : 1));

  const handleClick = (answer: string) => {
    onGuessAnswer(answer);
  };

  return (
    <div className="answer-question my-8">
      <p className="answer-question__question text-2xl mb-4">
        {index + 1}: {question.question}
      </p>
      <ul className="answer-question__answers grid grid-cols-1 md:grid-cols-2 gap-4">
        {allAnswers.map((answer) => (
          <li key={answer}>
            <button
              type="button"
              onClick={() => handleClick(answer)}
              className={`w-full p-4 rounded text-white ${
                showCorrectAnswer && answer === question.correctAnswer
                  ? "bg-green-500"
                  : showCorrectAnswer && answer !== question.correctAnswer
                  ? "bg-red-500"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
