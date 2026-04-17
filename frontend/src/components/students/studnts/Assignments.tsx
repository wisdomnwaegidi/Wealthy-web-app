import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAssignments } from "../../../api-client";
import { useAppContext } from "../../../contexts/AppContext";
import { AssignmentType } from "../../../../../backend/src/shared/assignment";

export default function Assignments() {
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, showToast } = useAppContext();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // Then fetch assignments using the userId
        const data = await getAllAssignments();
        setAssignments(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch assignments";
        setError(errorMessage);
        showToast({
          message: errorMessage,
          type: "ERROR",
        });
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchAssignments();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, showToast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    return status === "Not Started" ? "Not Started" : status;
  };

  if (loading) {
    return (
      <div className='p-4'>
        <h2 className='text-xl font-bold mb-4'>Assignments</h2>
        <p>Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-4'>
        <h2 className='text-xl font-bold mb-4'>Assignments</h2>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Assignments</h2>

      {assignments.length === 0 ? (
        <p className='text-gray-500'>No assignments available.</p>
      ) : (
        <div className='space-y-4'>
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className='border rounded-lg p-4 shadow-sm bg-white'
            >
              <div className='flex justify-between items-start mb-3'>
                <div>
                  <h3 className='text-lg font-semibold'>
                    {assignment.subject}
                  </h3>
                  <p className='text-gray-600'>{assignment.assignment}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    assignment.status
                  )}`}
                >
                  {getStatusText(assignment.status)}
                </span>
              </div>

              <div className='flex justify-between items-center'>
                <p className='text-sm text-gray-500'>
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>

                {assignment.status !== "completed" ? (
                  <Link
                    to={`/student-dashboard/assignments/${assignment._id}`}
                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm'
                  >
                    {assignment.status === "Not Started" ? "Start" : "Continue"}
                  </Link>
                ) : (
                  <span className='text-green-600 font-medium text-sm'>
                    Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
