import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../schema/forgotPassWordSchema";
import { ParentsFormData } from "../schema/forgotPassWordSchema";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

/* type forgotPasswordProps = {
  color?: string;
}; */

const ForgotPassword = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParentsFormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation(apiClient.forgotPassword, {
    onSuccess: async () => {
      showToast({
        message: "Password reset sent to your email",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className='mt-52 flex flex-col items-center bg-white w-full sm:w-2/4 mx-auto my-52 mb-52 shadow-md'>
      <form onSubmit={onSubmit} className='flex flex-col p-8 w-[90%]'>
        <h1 className='text-[16px] sm:text-2xl font-semibold mb-4'>
          Forgot Password
        </h1>
        <label htmlFor='resetPassword' className='font-bold'>
          Parent Email
          <input
            type='parentsEmail'
            {...register("parentsEmail")}
            placeholder=''
            className={`text-gray-700 bg-gray-200 w-full p-3 border  ${
              errors.parentsEmail ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
        </label>
        {errors.parentsEmail && (
          <span className='text-red-700'>{errors.parentsEmail.message}</span>
        )}
        <button
          type='submit'
          className='bg-purple-600 text-white py-3.5 rounded-lg my-2.5 w-full font-bold  text-base disabled:bg-gray-500'
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <div className='flex items-center justify-center'>
              <span className='inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2.5'></span>
              <p>Submitting</p>
            </div>
          ) : (
            "Send me reset link"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
