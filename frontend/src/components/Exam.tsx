import { useState } from "react";
import { examQuestions } from "../data/examQuestions";
import ExamTimer from "./ExamTimer";



const Exam = () => {
  const [userAnswers, setUserAnswers] = useState<any[]>(
    new Array(examQuestions.length).fill(null),
  );

  console.log(userAnswers);

  const [score, setScore] = useState<null>(null);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  const handleAnswerSelection = (
    questionIndex: number,
    answerIndex: number,
  ) => {
    if (!submitted) {
      const newAnswers = [...userAnswers];
      newAnswers[questionIndex] = answerIndex;
      setUserAnswers(newAnswers);
    }
  };

  const handleSubmitExam = () => {
    if (submitted) return;

    const userScore = userAnswers.reduce((score, userAnswer, index) => {
      if (userAnswer === examQuestions[index].correctAnswer) {
        score++;
      }
      return score;
    }, 0);

    setScore(userScore);
    setSubmitted(true);
    setIsTimerActive(false);
  };

  // Determine if the user passed or failed
  const isPassed = score !== null && score >= 10;

  return (
    <div className='w-full lg:w-11/12 mx-auto my-10 lg:my-40 px-4 lg:px-0 mt-[10rem]'>
      <div className='mb-10'>
        <ExamTimer duration={60 * 30} isTimerActive={isTimerActive} />
        <h1 className='text-center mb-2 text-lg lg:text-2xl'>
          2022/2023 Examination of Wealthy Homes Academy.
        </h1>
        <h1 className='text-center text-lg lg:text-xl'>English Language</h1>
        <h4 className='text-center underline text-sm lg:text-base'>
          Please endeavor to read all information before answering the
          questions.
        </h4>
      </div>
      <ul className='my-2'>
        {examQuestions.map((question, questionIndex) => (
          <li
            key={question.id}
            className='font-extrabold text-base lg:text-xl mb-4'
          >
            {question.text}
            <ul className='flex flex-col lg:flex-row justify-between my-5'>
              {question.answers.map((answer, answerIndex) => (
                <li
                  key={answer}
                  className='font-semibold text-sm lg:text-base mb-2 lg:mb-0'
                >
                  <label htmlFor='answer'>
                    <input
                      type='radio'
                      name={`question ${questionIndex}`}
                      value={answerIndex}
                      checked={userAnswers[questionIndex] === answerIndex}
                      onChange={() =>
                        handleAnswerSelection(questionIndex, answerIndex)
                      }
                      disabled={submitted}
                      className='mr-2'
                    />
                  </label>
                  {answer}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button
        type='button'
        onClick={handleSubmitExam}
        className='text-white bg-blue-900 border-none outline-none py-3 px-6 lg:py-4 lg:px-8 mt-5 font-bold border-4 border-primary hover:text-white hover:bg-blue-600'
      >
        Submit Exam
      </button>

      {submitted && (
        <div className='mt-5'>
          {isPassed ? (
            <h1 className='text-lg lg:text-xl'>
              Congratulations! You passed the exam.
            </h1>
          ) : (
            <h1 className='text-lg lg:text-xl'>Sorry, you failed the exam.</h1>
          )}
          <h1 className='text-lg lg:text-xl font-bold'>
            Your score is {score} out of {examQuestions.length}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Exam;
