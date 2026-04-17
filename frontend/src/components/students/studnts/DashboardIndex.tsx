import { useState, useEffect } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import { fetchCurrentUser, updateUserDetails } from "../../../api-client";
import { UserType } from "../../../../../backend/src/shared/types";

type FieldProps = {
  label: string;
  name: string;
  value: string | number;
  isEditing: boolean;
  editedValue?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const DashboardIndex = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<UserType | null>(null);
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchCurrentUser();
        setUser(userData);
        setEditedUser(userData);
      } catch (error) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-[60vh]'>
        <span className='inline-block w-16 h-16 border-4 border-prcolor border-t-transparent rounded-full animate-spin'></span>
        <p className='mt-4 text-prcolor text-lg font-medium'>Loading...</p>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedUser(user);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSaveChanges = async () => {
    if (editedUser) {
      try {
        const updatedUser = await updateUserDetails(editedUser);
        setUser(updatedUser);
        setIsEditing(false);
        setError(null);
      } catch (error) {
        console.error("Error updating user details:", error);
        setError("Failed to update user details. Please try again.");
      }
    }
  };
  // end new code

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-10'>
      <div className='max-w-4xl mx-auto'>
        {/* HEADER CARD */}
        <div className='bg-white shadow-sm rounded-2xl p-6 mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold'>Student Profile</h1>
            <p className='text-gray-500 text-sm'>Manage personal details</p>
          </div>

          <button
            onClick={handleEditToggle}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              isEditing
                ? "bg-gray-200 text-gray-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isEditing ? "Cancel Edit" : "Edit Profile"}
          </button>
        </div>

        {/* PROFILE CARD */}
        <div className='bg-white shadow-sm rounded-2xl p-6'>
          {isLoggedIn && user && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* LEFT COLUMN */}
              <div className='space-y-4'>
                <Field
                  label='First Name'
                  name='childFirstName'
                  value={user.childFirstName}
                  isEditing={isEditing}
                  editedValue={editedUser?.childFirstName}
                  onChange={handleInputChange}
                />

                <Field
                  label='Surname'
                  name='childSurname'
                  value={user.childSurname}
                  isEditing={isEditing}
                  editedValue={editedUser?.childSurname}
                  onChange={handleInputChange}
                />

                <Field
                  label='Age'
                  name='childAge'
                  value={`${user.childAge} years`}
                  isEditing={isEditing}
                  editedValue={editedUser?.childAge}
                  type='number'
                  onChange={handleInputChange}
                />

                <Field
                  label='Class'
                  name='childClass'
                  value={user.childClass}
                  isEditing={isEditing}
                  editedValue={editedUser?.childClass}
                  onChange={handleInputChange}
                />
              </div>

              {/* RIGHT COLUMN */}
              <div className='space-y-4'>
                <Field
                  label='Home Address'
                  name='homeAddress'
                  value={user.homeAddress}
                  isEditing={isEditing}
                  editedValue={editedUser?.homeAddress}
                  onChange={handleInputChange}
                />

                <Field
                  label='Parent Names'
                  name='parentNames'
                  value={user.parentNames}
                  isEditing={isEditing}
                  editedValue={editedUser?.parentNames}
                  onChange={handleInputChange}
                />

                <Field
                  label='State of Origin'
                  name='stateOfOrigin'
                  value={user.stateOfOrigin}
                  isEditing={isEditing}
                  editedValue={editedUser?.stateOfOrigin}
                  onChange={handleInputChange}
                />

                <Field
                  label='Email'
                  name='parentsEmail'
                  value={user.parentsEmail}
                  isEditing={isEditing}
                  editedValue={editedUser?.parentsEmail}
                  type='email'
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {/* SAVE BUTTON */}
          {isEditing && (
            <div className='mt-6 flex justify-end'>
              <button
                onClick={handleSaveChanges}
                className='px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition'
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function Field({
  label,
  name,
  value,
  isEditing,
  editedValue,
  onChange,
  type = "text",
}: FieldProps) {
  return (
    <div className='space-y-1'>
      <label className='text-sm text-gray-500'>{label}</label>

      {isEditing ? (
        <input
          className='w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
          type={type}
          name={name}
          value={editedValue || ""}
          onChange={onChange}
        />
      ) : (
        <div className='px-3 py-2 bg-gray-100 rounded-xl font-medium text-gray-800'>
          {value}
        </div>
      )}
    </div>
  );
}

export default DashboardIndex;
