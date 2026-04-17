import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAssignmentById,
  submitAssignment,
} from "../../../api-client";
import { useAppContext } from "../../../contexts/AppContext";
import { SubmissionResponse } from "../../../../../backend/src/shared/assignmentResponse"

interface Option {
  optionText: string;
  isCorrect: boolean;
}

interface Question {
  questionNumber: number;
  questionText: string;
  options: Option[];
}

interface Assignment {
  _id: string;
  subject: string;
  assignment: string;
  dueDate: string | Date;
  status: "completed" | "Pending" | "Not Started";
  questions: Question[];
}

export default function AssignmentsPage() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<SubmissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        if (!assignmentId) {
          setError("Assignment ID is required");
          return;
        }

        const data = await getAssignmentById(assignmentId);
        setAssignment(data);

        // Check if already completed
        if (data.status === "completed") {
          setSubmitted(true);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load assignment";
        setError(errorMessage);
        showToast({
          message: errorMessage,
          type: "ERROR",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [assignmentId, showToast]);

  const handleAnswerChange = (questionNumber: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNumber]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (!assignment || !assignmentId) return;

    // Check if all questions are answered
    const unansweredQuestions = assignment.questions.filter(
      (q) => !answers[q.questionNumber]
    );

    if (unansweredQuestions.length > 0) {
      showToast({
        message: `Please answer all questions. ${unansweredQuestions.length} questions remaining.`,
        type: "ERROR",
      });
      return;
    }

    setSubmitting(true);

    try {
      const answersArray = Object.entries(answers).map(
        ([questionNumber, answer]) => ({
          questionNumber: Number(questionNumber),
          answer,
        })
      );

      const result = await submitAssignment(assignmentId, answersArray);
      setResults(result);
      setSubmitted(true);

      showToast({
        message: `Assignment submitted! Your score: ${result.score}%`,
        type: "SUCCESS",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit assignment";
      showToast({
        message: errorMessage,
        type: "ERROR",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-lg'>Loading assignment...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-red-500'>{error}</div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div>Assignment not found</div>
      </div>
    );
  }

  if (submitted && results) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <div className='bg-white rounded-lg shadow-lg p-8 text-center'>
          <h1 className='text-3xl font-bold mb-4'>Assignment Completed!</h1>
          <h2 className='text-xl mb-6'>{assignment.subject}</h2>

          <div className='mb-6'>
            <div
              className={`text-6xl font-bold mb-2 ${getScoreColor(
                results.score
              )}`}
            >
              {results.score}%
            </div>
            <p className='text-gray-600'>
              {results.correctAnswers} out of {results.totalQuestions} correct
            </p>
          </div>

          <div className='flex gap-4 justify-center'>
            <button
              onClick={() => navigate("/student-dashboard")}
              className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted && !results) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <div className='bg-yellow-100 border border-yellow-400 rounded-lg p-4'>
          <p>This assignment has already been completed.</p>
          <button
            onClick={() => navigate("/student-dashboard")}
            className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='bg-white rounded-lg shadow-lg p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold mb-2'>{assignment.subject}</h1>
          <h2 className='text-xl text-gray-600 mb-4'>
            {assignment.assignment}
          </h2>
          <p className='text-sm text-gray-500'>
            Due: {new Date(assignment.dueDate).toLocaleDateString()}
          </p>
        </div>

        <div className='space-y-8'>
          {assignment.questions.map((question) => (
            <div key={question.questionNumber} className='border-b pb-6'>
              <h3 className='text-lg font-semibold mb-4'>
                {question.questionNumber}. {question.questionText}
              </h3>

              <div className='space-y-2'>
                {question.options.map((option, index) => (
                  <label
                    key={`${question.questionNumber}-${index}`}
                    className='flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer'
                  >
                    <input
                      type='radio'
                      name={`question-${question.questionNumber}`}
                      value={option.optionText}
                      checked={
                        answers[question.questionNumber] === option.optionText
                      }
                      onChange={(e) =>
                        handleAnswerChange(
                          question.questionNumber,
                          e.target.value
                        )
                      }
                      className='text-blue-600 focus:ring-blue-500'
                    />
                    <span className='text-gray-700'>{option.optionText}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-8 flex justify-between items-center'>
          <p className='text-gray-600'>
            {Object.keys(answers).length} of {assignment.questions.length}{" "}
            questions answered
          </p>

          <button
            onClick={handleSubmit}
            disabled={
              submitting ||
              Object.keys(answers).length !== assignment.questions.length
            }
            className='bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {submitting ? "Submitting..." : "Submit Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
}
