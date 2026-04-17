import { useState } from "react";

const EmailVerification = () => {
  const [verificationStatus] = useState<string>(
    "Awaiting verification email..."
  );

  const getStatusClass = () => {
    if (
      verificationStatus === "Verifying..." ||
      verificationStatus === "Awaiting verification email..."
    )
      return "text-yellow-500";
    if (verificationStatus.includes("successful")) return "text-green-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-md mx-auto m-[10rem] p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Email Verification
      </h2>
      <p className={`text-center font-semibold ${getStatusClass()}`}>
        {verificationStatus}
      </p>
      {verificationStatus.includes("successful") && (
        <p className="text-center text-gray-600 mt-4">
          Redirecting to home page...
        </p>
      )}
      {verificationStatus === "Awaiting verification email..." && (
        <p className="text-center text-gray-600 mt-4">
          Please check your email for the verification link.
        </p>
      )}
    </div>
  );
};

export default EmailVerification;
