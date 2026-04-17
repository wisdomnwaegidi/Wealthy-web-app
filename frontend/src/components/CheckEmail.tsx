const CheckEmail = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Check Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          We've sent a verification email to the address you provided. Please
          check your inbox and click the verification link to complete the
          registration process.
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
        <p className="text-gray-500 mt-4 text-center">
          If you don't receive the email within a few minutes, please check your
          spam folder or
          <button type="button" className="text-purple-600 hover:text-purple-800 font-semibold">
            click here to resend the verification link
          </button>
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
