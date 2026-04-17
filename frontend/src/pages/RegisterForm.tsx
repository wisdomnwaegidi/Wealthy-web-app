import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../schema/registerSchema";
import { RegisterFormData } from "../schema/registerSchema";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = (): void => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({
        message: "Registration successful! Verification email sent.",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate(`/verify-email`);
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Registration failed. Please try again.";

      showToast({
        message: errorMessage.includes("User already exists")
          ? "User already exists. Please use a different email."
          : errorMessage,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      className='mt-[10rem] mb-52 shadow-xl w-[90%] mx-auto md:w-[565px] md:mx-auto'
      onSubmit={onSubmit}
    >
      <h1 className='text-center font-bold text-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-10 text-white'>
        Create an Account
      </h1>
      <div className='mx-[3rem] py-9'>
        <div>
          <div className='mt-4 flex flex-col md:flex-row md:align-center md:justify-between md:gap-4'>
            <div className='mb-4 '>
              <label htmlFor='childFirstName' className='font-bold flex-1'>
                Child First Name
                <input
                  id='childFirstName'
                  type='text'
                  className={`mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal ${
                    errors.childFirstName ? "border-red-500" : ""
                  }`}
                  placeholder='Child First Name'
                  {...register("childFirstName")}
                />
              </label>
              {errors.childFirstName && (
                <span className="text-red-700 before:content-['⚠_']">
                  {errors.childFirstName.message}
                </span>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='childSurname' className='font-bold flex-1'>
                Child Surname
                <input
                  id='childSurname'
                  type='text'
                  className={`mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal ${
                    errors.childSurname ? "border-red-500" : ""
                  }`}
                  placeholder='Child Surname'
                  {...register("childSurname")}
                />
              </label>
              {errors.childSurname && (
                <span className="text-red-700 before:content-['⚠_']">
                  {errors.childSurname.message}
                </span>
              )}
            </div>
          </div>
          <div className='mb-4'>
            <label htmlFor='childAge' className='font-bold'>
              Child Age
              <input
                id='childAge'
                type='number'
                min={1}
                className={`mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal ${
                  errors.childAge ? "border-red-500" : ""
                }`}
                placeholder='Example 10'
                {...register("childAge", { valueAsNumber: true })}
              />
            </label>
            {errors.childAge && (
              <span className="text-red-700 before:content-['⚠_']">
                {errors.childAge.message}
              </span>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='homeAddress' className='font-bold'>
              Home Address
              <input
                id='homeAddress'
                type='text'
                className={`mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal  ${
                  errors.homeAddress ? "border-red-500" : ""
                }`}
                placeholder='No 8 Oguta Street Dele Lagos'
                {...register("homeAddress")}
              />
            </label>
            {errors.homeAddress && (
              <span className="text-red-700 before:content-['⚠_']">
                {errors.homeAddress.message}
              </span>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='parentNames' className='font-bold'>
              Parent Names
              <input
                id='parentNames'
                type='text'
                className={`mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal  ${
                  errors.parentNames ? "border-red-500" : ""
                }`}
                placeholder='Tunde and Chioma Adebowale'
                {...register("parentNames")}
              />
            </label>
            {errors.parentNames && (
              <span className="text-red-700 before:content-['⚠_']">
                {errors.parentNames.message}
              </span>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='stateOfOrigin' className='font-bold'>
              State of origin
              <input
                id='stateOfOrigin'
                type='text'
                className={`mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal  ${
                  errors.stateOfOrigin ? "border-red-500" : ""
                }`}
                placeholder='Lagos State'
                {...register("stateOfOrigin")}
              />
            </label>
            {errors.stateOfOrigin && (
              <span className="text-red-700 before:content-['⚠_']">
                {errors.stateOfOrigin.message}
              </span>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='childClass' className='font-bold'>
              Child Class
              <input
                id='childClass'
                type='text'
                className={`mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal  ${
                  errors.childClass ? "border-red-500" : ""
                }`}
                placeholder='Primary 1'
                {...register("childClass")}
              />
            </label>
            {errors.childClass && (
              <span className="text-red-700 before:content-['⚠_']">
                {errors.childClass.message}
              </span>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='parentsEmail' className='font-bold'>
              Parents Email
              <input
                id='parentsEmail'
                type='email'
                className={`mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal  ${
                  errors.parentsEmail ? "border-red-500" : ""
                }`}
                placeholder='adekunle@gmail.com'
                {...register("parentsEmail")}
              />
            </label>
            {errors.parentsEmail && (
              <span className="text-red-700 before:content-['⚠_']">
                {errors.parentsEmail.message}
              </span>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='font-bold relative'>
              Password
              <div className='relative'>
                <input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  className={`mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal ${
                    errors.password ? "border-red-500" : ""
                  } pr-10`}
                  placeholder='Password'
                  {...register("password")}
                />
                <button
                  type='button'
                  onClick={togglePassword}
                  className='absolute inset-y-0 right-0 flex items-center px-3'
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
            className='py-3 px-6 font-semibold rounded-lg flex justify-center items-center w-full mb-4 bg-purple-600 text-white cursor-pointer transition-colors disabled:bg-gray-500'
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <span>
                <span className='inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2.5'></span>
                <span>Submitting...</span>
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Divider */}
          <div className='flex items-center gap-3 my-4'>
            <hr className='flex-1 border-gray-300' />
            <span className='text-gray-400 text-sm'>or continue with</span>
            <hr className='flex-1 border-gray-300' />
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
            <p>Already a Student?</p>
            <Link to='/login' className='font-bold text-prcolor'>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
