import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, ResetFormData } from "../schema/resetPasswordSchema";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  // const location = useLocation();
  // const queryClient = useQueryClient();
  const { token } = useParams<{ token: string }>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showStrength, setShowStrength] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetFormData>({
    resolver: zodResolver(schema),
  });

  const password = watch("password", "");

  useEffect(() => {
    if (!token) {
      showToast({ message: "Invalid or missing reset token", type: "ERROR" });
      navigate("/forgot-password");
    }
  }, [token, showToast, navigate]);

  useEffect(() => {
    if (password) {
      setShowStrength(true);
      const timer = setTimeout(() => {
        setShowStrength(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowStrength(false);
    }
  }, [password]);

  const mutation = useMutation(
    (formData: ResetFormData) =>
      apiClient.resetPassword({ ...formData, token: token || "" }),
    {
      onSuccess: () => {
        showToast({ message: "Password reset successful!", type: "SUCCESS" });
        navigate("/login");
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    },
  );

  const onSubmit = handleSubmit((data) => {
    if (token) {
      mutation.mutate(data);
    } else {
      showToast({ message: "Invalid or missing token", type: "ERROR" });
    }
  });

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return "";
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className='mt-52 flex flex-col items-center bg-white w-full max-w-md mx-auto my-52 mb-52'>
      <form onSubmit={onSubmit} className='flex flex-col shadow-md p-8 w-full'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Reset Password</h2>

        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-700'
          >
            New Password
          </label>
          <div className='relative'>
            <input
              id='password'
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder='Enter your new password'
              className={`text-gray-700 bg-gray-200 w-full p-3 pr-10 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded`}
              disabled={mutation.isLoading}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-3 text-gray-600'
              tabIndex={-1}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <span className='text-red-500 text-sm'>
              {errors.password.message}
            </span>
          )}
          {showStrength && password && (
            <div className='mt-2'>
              <span className='text-sm'>
                Password strength:{" "}
                <span
                  className={`font-medium ${
                    passwordStrength === "Weak"
                      ? "text-red-500"
                      : passwordStrength === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {passwordStrength}
                </span>
              </span>
            </div>
          )}
        </div>

        <div className='mb-6'>
          <label
            htmlFor='confirmPassword'
            className='block mb-2 text-sm font-medium text-gray-700'
          >
            Confirm Password
          </label>
          <div className='relative'>
            <input
              id='confirmPassword'
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder='Confirm your new password'
              className={`text-gray-700 bg-gray-200 w-full p-3 pr-10 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded`}
              disabled={mutation.isLoading}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-3 top-3 text-gray-600'
              tabIndex={-1}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className='text-red-500 text-sm'>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type='submit'
          className='bg-blue-900 text-white py-3.5 rounded-lg w-full font-bold cursor-pointer text-base disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <div className='flex items-center justify-center'>
              <span className='inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2.5'></span>
              <p>Resetting Password...</p>
            </div>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
