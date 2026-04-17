import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../contexts/AppContext";
import * as apiClient from "../../../api-client";
import {
  completeProfileSchema,
  CompleteProfileFormData,
} from "../../../schema/completeProfileSchema";

const CompleteProfile = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
  });

  const mutation = useMutation(apiClient.completeProfile, {
    onSuccess: async () => {
      showToast({
        message: "Profile completed successfully!",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate("/student-dashboard/dashboard-index");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message || "Failed to complete profile.",
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  const fields: {
    id: keyof CompleteProfileFormData;
    label: string;
    placeholder: string;
    type?: string;
  }[] = [
    { id: "childFirstName", label: "Child First Name", placeholder: "John" },
    { id: "childSurname", label: "Child Surname", placeholder: "Doe" },
    { id: "childAge", label: "Child Age", placeholder: "10", type: "number" },
    {
      id: "homeAddress",
      label: "Home Address",
      placeholder: "No 8 Oguta Street, Lagos",
    },
    {
      id: "parentNames",
      label: "Parent Names",
      placeholder: "Tunde and Chioma Adebowale",
    },
    {
      id: "stateOfOrigin",
      label: "State of Origin",
      placeholder: "Lagos State",
    },
    { id: "childClass", label: "Child Class", placeholder: "Primary 1" },
  ];

  return (
    <div>
      <form
        className='mt-[10rem] mb-52 shadow-xl w-[90%] mx-auto md:w-[565px]'
        onSubmit={onSubmit}
      >
        <h1 className='text-center font-bold text-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-10 text-white'>
          Complete Your Profile
        </h1>
        <p className='text-center text-gray-500 text-sm mt-4 px-6'>
          Please fill in the remaining details to finish setting up your
          account.
        </p>

        <div className='mx-[3rem] py-9 flex flex-col gap-4'>
          {fields.map(({ id, label, placeholder, type }) => (
            <div key={id}>
              <label htmlFor={id} className='font-bold'>
                {label}
                <input
                  id={id}
                  type={type || "text"}
                  placeholder={placeholder}
                  className={`mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal ${
                    errors[id] ? "border-red-500" : ""
                  }`}
                  {...register(
                    id,
                    type === "number" ? { valueAsNumber: true } : {},
                  )}
                />
              </label>
              {errors[id] && (
                <span className="text-red-700 before:content-['⚠_']">
                  {errors[id]?.message}
                </span>
              )}
            </div>
          ))}

          <button
            type='submit'
            disabled={mutation.isLoading}
            className='py-3 px-6 font-semibold rounded-lg flex justify-center items-center w-full bg-purple-600 text-white cursor-pointer transition-colors disabled:bg-gray-400'
          >
            {mutation.isLoading ? (
              <span className='flex items-center gap-2'>
                <span className='inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
                Saving...
              </span>
            ) : (
              "Save & Continue"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfile;
