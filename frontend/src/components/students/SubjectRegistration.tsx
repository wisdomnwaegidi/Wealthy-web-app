import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../../contexts/AppContext";
import * as apiClient from "../../api-client";
import {
  subjectRegistrationSchema,
  SubjectRegistrationFormData,
} from "../../schema/subjectRegistrationSchema";

const SubjectRegistrationForm = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubjectRegistrationFormData>({
    resolver: zodResolver(subjectRegistrationSchema),
  });

  interface ApiError {
    message: string;
    response?: {
      data?: {
        message?: string;
      };
    };
  }

  const mutation = useMutation(apiClient.submitSubjectRegistration, {
    onSuccess: async () => {
      showToast({
        message: "Subjects registered successfully!",
        type: "SUCCESS",
      });

      // Reset form without values to clear all fields
      reset();

      await queryClient.invalidateQueries("subjects");
    },
    onError: (error: ApiError) => {
      let errorMessage = "";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      showToast({
        message: errorMessage || "Failed to register subjects",
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    console.log("Subject registration submitted:", data);
  });

  return (
    <div>
      <form
        className='mt-[6rem] mb-32 shadow-xl w-[90%] mx-auto md:w-[565px]'
        onSubmit={onSubmit}
      >
        <h1 className='text-center font-bold text-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-10 text-white'>
          Subject Registration
        </h1>
        <div className='mx-[3rem] py-9'>
          {/* Child Class */}
          <div className='mb-6'>
            <label htmlFor='childClass' className='font-bold block mb-1'>
              Child Class
            </label>
            <select
              id='childClass'
              className={`border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 ${
                errors.childClass ? "border-red-500" : ""
              }`}
              {...register("childClass")}
              defaultValue=''
            >
              <option value='' disabled>
                Select a class
              </option>
              <option value='Primary 1'>Primary 1</option>
              <option value='Primary 2'>Primary 2</option>
              <option value='Primary 3'>Primary 3</option>
              <option value='Primary 4'>Primary 4</option>
              <option value='Primary 5'>Primary 5</option>
              <option value='Primary 6'>Primary 6</option>
            </select>
            {errors.childClass && (
              <span className="text-red-700 before:content-['⚠_']">
                {errors.childClass.message}
              </span>
            )}
          </div>

          {/* Term */}
          <div className='mb-6'>
            <label htmlFor='term' className='font-bold block mb-1'>
              Term
            </label>
            <select
              id='term'
              className={`border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 ${
                errors.term ? "border-red-500" : ""
              }`}
              {...register("term")}
              defaultValue=''
            >
              <option value='' disabled>
                Select a term
              </option>
              <option value='First Term'>First Term</option>
              <option value='Second Term'>Second Term</option>
              <option value='Third Term'>Third Term</option>
            </select>
            {errors.term && (
              <span className="text-red-700 before:content-['⚠_']">
                {errors.term.message}
              </span>
            )}
          </div>

          {/* Subjects */}
          <div className='mb-6'>
            <label className='font-bold block mb-2'>Subjects</label>
            <div className='grid grid-cols-2 gap-2'>
              {[
                "Mathematics",
                "English",
                "Science",
                "Social Studies",
                "Computer",
                "Agriculture",
              ].map((subject) => (
                <label key={subject} className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    value={subject}
                    {...register("subjects")}
                    className='rounded text-green-600'
                  />
                  <span>{subject}</span>
                </label>
              ))}
            </div>
            {errors.subjects && (
              <span className="text-red-700 before:content-['⚠_']">
                {errors.subjects.message}
              </span>
            )}
          </div>

          {/* Submit button */}
          <button
            type='submit'
            className='py-3 px-6 font-semibold rounded-lg flex justify-center items-center w-full mb-4 bg-green-600 text-white cursor-pointer transition-colors disabled:bg-gray-500'
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <span>
                <span className='inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2.5'></span>
                <span>Submitting...</span>
              </span>
            ) : (
              "Register Subjects"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubjectRegistrationForm;
