import { SubmissionResponse } from "./../../backend/src/shared/assignmentResponse";
import { AssignmentType } from "./../../backend/src/shared/assignment";
import { LoginFormData } from "./schema/loginSchema";
import { RegisterFormData } from "./schema/registerSchema";
import { ResetFormData } from "./schema/resetPasswordSchema";
import { ParentsFormData } from "./schema/forgotPassWordSchema";
import { UserType } from "../../backend/src/shared/types";
import { SubjectRegistrationType } from "../../backend/src/shared/subjectRegistrationTypes";
import { NewsletterFormData } from "./schema/subscriptionSchema";
import { SubjectRegistrationFormData } from "./schema/subjectRegistrationSchema";
import {
  PaymentData,
  PaymentHistory,
  PaymentResponse,
} from "./schema/schoolFeesSchema";
import { CompleteProfileFormData } from "./schema/completeProfileSchema";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5500";
if (!API_BASE_URL) {
  console.error("API_BASE_URL is not defined.");
  throw new Error("API_BASE_URL is not defined.");
}

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (responseBody.errors?.length > 0) {
      throw new Error(responseBody.errors[0].msg);
    }
    throw new Error(responseBody.message || "Registration failed");
  }

  return responseBody;
};

export const login = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const resetPassword = async (
  formData: ResetFormData & { token: string },
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/users/reset-password/${formData.token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: formData.password }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to reset password");
  }

  return response.json();
};

export const forgotPassword = async (formData: ParentsFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/forgot-password`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const updateUserDetails = async (
  updatedUser: UserType,
): Promise<UserType> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/users/${updatedUser._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user details");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error in updateUserDetails:", error);
    throw error;
  }
};

// for school fees payment
/* export const paySchoolFees = async (
  formData: PaymentFormData
): Promise<{ rrrCode?: string; bankDetails?: string }> => {
  const response = await fetch(`${API_BASE_URL}/create-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message || "Error submitting data");
  }

  return responseBody;
}; */

export const getData = async () => {
  const response = await fetch(`${API_BASE_URL}/get-payment`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message || "Error fetching data");
  }

  return responseBody;
};


export const submitSubjectRegistration = async (
  formData: SubjectRegistrationFormData,
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/users/subject-registration`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const fetchCurrentUserSubjects = async (
  userId: string,
): Promise<SubjectRegistrationType[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/users/subject-registration/${userId}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Error fetching subjects");
  }

  return response.json(); // ✅ returns an array
};

export const updateSubjectRegistration = async (
  registrationId: string,
  subjects: string[],
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/users/subject-registration/${registrationId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subjects }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update subjects");
  }

  return response.json();
};

export const deleteSubjectRegistration = async (registrationId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/users/subject-registration/${registrationId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete registration");
  }

  return response.json();
};

// Get all assignments for current user
export const getAllAssignments = async (): Promise<AssignmentType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/users/assignments`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching assignments: ${response.statusText}`);
  }

  return response.json();
};

// Get single assignment by ID
export const getAssignmentById = async (
  assignmentId: string,
): Promise<AssignmentType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/users/assignments/${assignmentId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error fetching assignment: ${response.statusText}`);
  }

  return response.json();
};

// Submit assignment
export const submitAssignment = async (
  assignmentId: string,
  answers: { questionNumber: number; answer: string }[],
): Promise<SubmissionResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/users/assignments/${assignmentId}/submit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ answers }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to submit assignment");
  }

  return response.json();
};

// Get payment history
export const getPaymentHistory = async (): Promise<PaymentHistory[]> => {
  const response = await fetch(`${API_BASE_URL}/api/users/fees/history`, {
    method: "GET",
    credentials: "include", // ensures cookies/session tokens are sent
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch payment history");
  }

  const data = await response.json();
  return data as PaymentHistory[];
};

// Process payment - Updated to use PaymentData interface
export const processPayment = async (
  paymentData: PaymentData,
): Promise<PaymentResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/users/fees/process`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Payment processing failed");
  }

  return response.json();
};

// Verify payment
export const verifyPayment = async (
  reference: string,
): Promise<PaymentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/users/fees/verify/${reference}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Payment verification failed");
  }

  return response.json();
};

// Legacy function for compatibility - Updated typing
export const paySchoolFees = async (
  paymentData: PaymentData,
): Promise<PaymentResponse> => {
  return processPayment(paymentData);
};

export const newsletter = async (formData: NewsletterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/newsletter`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (responseBody.errors?.length > 0) {
      throw new Error(responseBody.errors[0].msg);
    }
    throw new Error(responseBody.message || "Subscription failed");
  }

  return responseBody;
};

export const googleAuth = () => {
  window.location.href = `${API_BASE_URL}/api/users/auth/google`;
};

export const completeProfile = async (formData: CompleteProfileFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/complete-profile`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok)
    throw new Error(responseBody.message || "Failed to complete profile");
  return responseBody;
};
