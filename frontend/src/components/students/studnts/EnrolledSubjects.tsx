import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchCurrentUserSubjects,
  fetchCurrentUser,
  updateSubjectRegistration,
  deleteSubjectRegistration,
} from "../../../api-client";
import { SubjectRegistrationType } from "../../../../../backend/src/shared/subjectRegistrationTypes";
import { useAppContext } from "../../../contexts/AppContext";

const EnrolledSubjects = () => {
  const [registrations, setRegistrations] = useState<SubjectRegistrationType[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingSubjects, setEditingSubjects] = useState<string[]>([]);
  const { isLoggedIn, showToast } = useAppContext();

  const availableSubjects = [
    "Mathematics",
    "English",
    "Science",
    "Social Studies",
    "Computer",
    "Agriculture",
  ];

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // First get current user to get the userId
        const currentUser = await fetchCurrentUser();

        if (!currentUser?._id) {
          throw new Error("User ID not available");
        }

        // Then fetch subjects using the userId
        const data = await fetchCurrentUserSubjects(currentUser._id);
        setRegistrations(data);
      } catch (error) {
        console.error(error);
        setError("Could not load subjects");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchSubjects();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const handleEditClick = (registration: SubjectRegistrationType) => {
    setEditingId(registration._id);
    setEditingSubjects([...registration.subjects]);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingSubjects([]);
  };

  const handleSubjectChange = (subject: string, isChecked: boolean) => {
    if (isChecked) {
      setEditingSubjects((prev) => [...prev, subject]);
    } else {
      setEditingSubjects((prev) => prev.filter((s) => s !== subject));
    }
  };

  const handleSaveEdit = async (registrationId: string) => {
    if (editingSubjects.length === 0) {
      showToast({
        message: "Please select at least one subject",
        type: "ERROR",
      });
      return;
    }

    try {
      await updateSubjectRegistration(registrationId, editingSubjects);

      // Update local state
      setRegistrations((prev) =>
        prev.map((reg) =>
          reg._id === registrationId
            ? { ...reg, subjects: editingSubjects }
            : reg
        )
      );

      setEditingId(null);
      setEditingSubjects([]);

      showToast({
        message: "Subjects updated successfully!",
        type: "SUCCESS",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update subjects";
      showToast({
        message: errorMessage,
        type: "ERROR",
      });
    }
  };

  const handleDeleteRegistration = async (registrationId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this registration? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await deleteSubjectRegistration(registrationId);

      // Update local state
      setRegistrations((prev) =>
        prev.filter((reg) => reg._id !== registrationId)
      );

      showToast({
        message: "Registration deleted successfully!",
        type: "SUCCESS",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to delete registration";
      showToast({
        message: errorMessage,
        type: "ERROR",
      });
    }
  };

  const renderRegistrationCard = (reg: SubjectRegistrationType) => {
    const isEditing = editingId === reg._id;

    if (isEditing) {
      return (
        <div
          key={reg._id}
          className='col-span-full p-6 rounded-lg bg-blue-50 border border-blue-200'
        >
          <h3 className='text-lg font-bold mb-4'>
            Edit Subjects for {reg.childClass} - {reg.term}
          </h3>

          <div className='grid grid-cols-2 gap-2 mb-4'>
            {availableSubjects.map((subject) => (
              <label key={subject} className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  checked={editingSubjects.includes(subject)}
                  onChange={(e) =>
                    handleSubjectChange(subject, e.target.checked)
                  }
                  className='rounded text-blue-600'
                />
                <span>{subject}</span>
              </label>
            ))}
          </div>

          <div className='flex gap-2'>
            <button
              onClick={() => handleSaveEdit(reg._id)}
              className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
              disabled={editingSubjects.length === 0}
            >
              Save Changes
            </button>
            <button
              onClick={handleCancelEdit}
              className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors'
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div key={reg._id} className='col-span-full mb-6'>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='text-lg font-bold'>
            {reg.childClass} - {reg.term}
          </h3>
          <div className='flex gap-2'>
            <button
              onClick={() => handleEditClick(reg)}
              className='px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors'
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteRegistration(reg._id)}
              className='px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors'
            >
              Delete
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {reg.subjects.map((subject, index) => (
            <div
              key={`${reg._id}-${index}`}
              className='p-4 rounded-lg bg-purple-100'
            >
              <h4 className='font-bold'>{subject}</h4>
              <p className='text-sm text-gray-600'>Class: {reg.childClass}</p>
              <p className='text-sm text-gray-600'>Term: {reg.term}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='flex flex-row items-center justify-between sm:mt-20'>
        <h2 className='text-[14px] sm:text-[2rem] font-extrabold'>
          Enrolled Subjects
        </h2>
        <Link
          className='px-3 py-2 text-[12px] sm:text-lg sm:px-6 sm:py-3 font-bold rounded-full bg-blue-800 text-white hover:bg-blue-700'
          to='/student-dashboard/register-subjects'
        >
          Register Subjects
        </Link>
      </div>

      <div className='mt-4'>
        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <p>Loading subjects...</p>
          </div>
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : registrations.length > 0 ? (
          <div className='space-y-6'>
            {registrations.map(renderRegistrationCard)}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-gray-500 mb-4'>No subjects registered yet.</p>
            <Link
              to='/student-dashboard/register-subjects'
              className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
            >
              Register Your First Subjects
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default EnrolledSubjects;
