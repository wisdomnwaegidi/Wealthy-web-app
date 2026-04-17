import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../schema/loginSchema";
import { LoginFormData } from "../schema/loginSchema";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = (): void => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const { showToast } = useAppContext();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/student-dashboard");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className='flex flex-col items-center bg-white w-full max-w-lg mx-auto mt-[8rem] mb-20 px-4 md:px-8'>
      <form onSubmit={onSubmit} className='flex flex-col shadow-md p-8 w-full'>
        <div>
          <h3 className='text-center mb-5 text-xl font-bold'>
            Sign in to Wealth Homes Academy
          </h3>
        </div>
        <div className='mb-4'>
          <label htmlFor='parentsEmail' className='login-label block mb-1'>
            Parents Email
            <input
              type='email'
              id='parentsEmail'
              {...register("parentsEmail")}
              className={`text-gray-700 bg-gray-200 w-full p-3 border  ${
                errors.parentsEmail ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder='Email'
            />
          </label>
          {errors.parentsEmail && (
            <span className="text-red-700 before:content-['⚠_']">
              {errors.parentsEmail.message}
            </span>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='login-label block mb-1 relative'>
            Password
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full p-3 border text-gray-700 bg-gray-200 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded pr-10`}
                placeholder='Password'
              />
              <button
                type='button'
                onClick={togglePassword}
                className={`absolute inset-y-0 right-0 flex items-center px-3 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-r`}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </label>
          {errors.password && (
            <span className="text-red-700 before:content-['⚠_']">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type='submit'
          className='bg-green-600 text-white py-3.5 rounded-lg my-2.5 w-full font-bold cursor-pointer text-base disabled:bg-gray-500'
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <div className='flex items-center justify-center'>
              <span className='inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2.5'></span>
              <p>Submitting</p>
            </div>
          ) : (
            "Continue"
          )}
        </button>
        <div className='flex justify-between mb-4'>
          <div className='flex items-center'>
            <label>
              Remember me
              <input
                type='checkbox'
                className='ml-1'
                {...register("keepMeSignedIn")}
              />
            </label>
          </div>
          <div>
            <Link to='/forgot-password' className='font-bold text-prcolor'>
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className='flex flex-col gap-3 mb-4'>
          <button
            type='button'
            onClick={apiClient.googleAuth}
            className='flex items-center justify-center gap-3 w-full py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700'
          >
            <FaGoogle className='text-red-500 text-lg' />
            Continue with Google
          </button>

          <button
            type='button'
            onClick={() =>
              showToast({
                message: "Apple Sign-In coming soon!",
                type: "SUCCESS",
              })
            }
            className='flex items-center justify-center gap-3 w-full py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700'
          >
            <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
            </svg>
            Continue with Apple
          </button>
        </div>

        <div className='flex justify-center align-center gap-2'>
          <p>Don't have an account?</p>
          <Link
            to='/register'
            className='font-bold text-blue-1 ml-1.25 text-green-500'
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
