import { useEffect, useState } from "react";
import Question from "./Question";

interface QuestionType {
  category: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  answers: string[];
}

const getQuestions = async (): Promise<QuestionType[]> => {
  try {
    const response = await fetch(
      "https://the-trivia-api.com/api/questions?limit=30"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const questions = await response.json();
    return questions;
  } catch (error) {
    throw new Error("Failed to fetch questions. Please check your connection.");
  }
};

const Quiz = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); 
  
  useEffect(() => {
    getQuestions()
      .then((res) => {
        setQuestions(res);
        setError(null);
      })
      .catch((err) => {
        setError(err.message); 
      });
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const remainingNumberOfQuestions = questions.length - currentQuestionIndex;

  const handleGuessAnswer = (guess: string) => {
    if (showCorrectAnswer) return;

    if (guess === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowCorrectAnswer(true);
      setTimeout(() => {
        setShowCorrectAnswer(false);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 2500);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowCorrectAnswer(false);
    getQuestions()
      .then((res) => {
        setQuestions(res);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="container mx-auto py-10 text-center mt-24">
      <header className="bg-prcolor text-white font-bold py-8 text-3xl uppercase mb-8">
        Wealthy Homes Trivia
      </header>
      <p className="text-center mx-auto mb-8">
        Welcome to Wealthy Homes Trivia Quiz. Have some fun while quizzing!
      </p>
      {error ? (
        <p className="text-red-500 text-xl font-bold">{error}</p>
      ) : currentQuestion ? (
        <>
          <div className="flex justify-around mx-auto mb-6">
            <div>
              <h3 className="font-bold">Total Questions</h3>
              <p>{questions.length}</p>
            </div>
            <div>
              <h3 className="font-bold">Current score</h3>
              <p>{score}</p>
            </div>
            <div>
              <h3 className="font-bold">Questions remaining</h3>
              <p>{remainingNumberOfQuestions}</p>
            </div>
          </div>
          <div className="mb-6">
            <div className="bg-yellow-400 text-gray-800 p-4 inline-block">
              <h4 className="inline-block mr-2">Question Category:</h4>
              <p className="inline-block">{currentQuestion.category}</p>
            </div>
          </div>
          <Question
            question={currentQuestion}
            index={currentQuestionIndex}
            onGuessAnswer={handleGuessAnswer}
            showCorrectAnswer={showCorrectAnswer}
          />
          <details className="my-4">
            <summary>Question JSON</summary>
            <pre className="text-left mx-auto p-2 bg-gray-100 border border-gray-300 rounded">
              {JSON.stringify(currentQuestion, null, 2)}
            </pre>
          </details>
        </>
      ) : (
        <p className="text-2xl font-bold">Loading Questions...</p>
      )}
      {remainingNumberOfQuestions === 0 && questions.length > 0 && (
        <>
          <p className="text-3xl font-bold">
            Complete! You scored {score}/{questions.length}
          </p>
          <button
            className="mt-4 bg-prcolor text-white py-2 px-4 rounded"
            onClick={resetQuiz}
          >
            Play again
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
