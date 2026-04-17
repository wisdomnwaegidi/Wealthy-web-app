import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "react-query";
import { useAppContext } from "../../../contexts/AppContext";
import * as apiClient from "../../../api-client";
import { jsPDF } from "jspdf";
import {
  PaymentFormData,
  paymentSchema,
} from "../../../schema/schoolFeesSchema";
import { UserType } from "../../../../../backend/src/shared/types";

// Updated Interfaces
interface PaymentHistory {
  _id: string;
  invoiceId: string;
  class:
    | "Primary 1"
    | "Primary 2"
    | "Primary 3"
    | "Primary 4"
    | "Primary 5"
    | "Primary 6";
  term: "1st Term" | "2nd Term" | "3rd Term";
  amount: number;
  status: "Pending" | "Completed" | "Failed";
  paymentMethod: "Paystack" | "Flutterwave" | "Remita" | "BankTransfer";
  createdAt: string;
  rrrCode?: string;
  transactionRef?: string;
}

interface PaymentResponse {
  success: boolean;
  message: string;
  data?: {
    rrrCode?: string;
    paymentUrl?: string;
    reference?: string;
    bankDetails?: string;
  };
}

// Extended PaymentFormData to include paymentMethod
interface ExtendedPaymentFormData extends PaymentFormData {
  paymentMethod: "Paystack" | "Flutterwave" | "Remita" | "BankTransfer";
}

const SchoolFeesPayment = () => {
  const { showToast, isLoggedIn } = useAppContext();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch current user data
  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn) {
        try {
          const user = await apiClient.fetchCurrentUser();
          setCurrentUser(user);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: 40000,
      class: undefined, // Use undefined instead of empty string
      term: undefined, // Use undefined instead of empty string
    },
  });

  // Fetch payment history with proper typing
  const { data: paymentHistory = [], refetch } = useQuery<PaymentHistory[]>(
    "paymentHistory",
    () => apiClient.getPaymentHistory(),
    { enabled: !!currentUser },
  );

  // Payment mutation with proper typing
  const paymentMutation = useMutation<
    PaymentResponse,
    Error,
    ExtendedPaymentFormData
  >((data: ExtendedPaymentFormData) => apiClient.processPayment(data), {
    onSuccess: (response: PaymentResponse) => {
      if (response.success && response.data) {
        showToast({
          message: response.message || "Payment initiated successfully!",
          type: "SUCCESS",
        });

        // Handle different payment methods
        if (response.data.paymentUrl) {
          window.open(response.data.paymentUrl, "_blank");
        }

        refetch();
        reset();
      } else {
        showToast({
          message: response.message || "Payment failed",
          type: "ERROR",
        });
      }
      setLoading(false);
    },
    onError: (error: Error) => {
      showToast({
        message: error.message || "Payment processing failed",
        type: "ERROR",
      });

      setLoading(false);
    },
  });

  // Paystack Integration
  const payWithPaystack = (formData: PaymentFormData) => {
    if (!currentUser) {
      showToast({
        message: "User information not available",
        type: "ERROR",
      });
      setLoading(false);
      return;
    }

    const handler = (
      window as unknown as {
        PaystackPop: {
          setup: (config: Record<string, unknown>) => {
            openIframe: () => void;
          };
        };
      }
    ).PaystackPop.setup({
      key:
        (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string) || "pk_test_xxxxx",
      email: currentUser.parentsEmail,
      amount: formData.amount * 100, // Paystack expects kobo
      currency: "NGN",
      ref: `SF_${Date.now()}`,
      metadata: {
        class: formData.class,
        term: formData.term,
        studentName: `${currentUser.childFirstName} ${currentUser.childSurname}`,
      },
      onSuccess: (transaction: { reference: string }) => {
        showToast({
          message: `Payment successful! Reference: ${transaction.reference}`,
          type: "SUCCESS",
        });
        refetch();
        setLoading(false);
      },
      onCancel: () => {
        showToast({
          message: "Payment was cancelled",
          type: "ERROR",
        });
        setLoading(false);
      },
    });
    handler.openIframe();
  };

  // Flutterwave Integration
  const payWithFlutterwave = (formData: PaymentFormData) => {
    if (!currentUser) {
      showToast({
        message: "User information not available",
        type: "ERROR",
      });
      setLoading(false);
      return;
    }

    const flutterwaveConfig = {
      public_key:
        import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || "FLWPUBK_TEST-xxxxx",
      tx_ref: `SF_${Date.now()}`,
      amount: formData.amount,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: currentUser.parentsEmail,
        phone_number: "08012345678",
        name: `${currentUser.childFirstName} ${currentUser.childSurname}`,
      },
      customizations: {
        title: "School Fees Payment",
        description: `Payment for ${formData.class} - ${formData.term}`,
        logo: "/logo192.png",
      },
      callback: (response: { status: string; tx_ref: string }) => {
        if (response.status === "successful") {
          showToast({
            message: `Payment successful! Reference: ${response.tx_ref}`,
            type: "SUCCESS",
          });
          refetch();
        }
        setLoading(false);
      },
      onclose: () => {
        showToast({
          message: "Payment was cancelled",
          type: "ERROR",
        });
        setLoading(false);
      },
    };

    // Use Flutterwave's inline payment
    const flutterwaveCheckout = (
      window as unknown as {
        FlutterwaveCheckout: (config: Record<string, unknown>) => void;
      }
    ).FlutterwaveCheckout;
    if (flutterwaveCheckout) {
      flutterwaveCheckout(flutterwaveConfig);
    }
  };

  const onSubmit = (data: PaymentFormData) => {
    // Validate that required fields are filled
    if (!data.class || !data.term) {
      showToast({
        message: "Please select both class and term",
        type: "ERROR",
      });
      return;
    }

    setLoading(true);
    // We don't call the function directly here since payment method buttons handle the submission
  };

  const handlePaymentMethod = (
    paymentMethod: "Paystack" | "Flutterwave" | "Remita" | "BankTransfer",
  ) => {
    const formData = watch();

    // Validate required fields
    if (!formData.class || !formData.term) {
      showToast({
        message: "Please select both class and term",
        type: "ERROR",
      });
      return;
    }

    // Check if user is logged in and user data is available
    if (!isLoggedIn || !currentUser) {
      showToast({
        message: "Please log in to make a payment",
        type: "ERROR",
      });
      return;
    }

    setLoading(true);

    const extendedFormData: ExtendedPaymentFormData = {
      ...formData,
      paymentMethod,
    };

    switch (paymentMethod) {
      case "Paystack":
        payWithPaystack(formData);
        break;
      case "Flutterwave":
        payWithFlutterwave(formData);
        break;
      case "Remita":
      case "BankTransfer":
      default:
        paymentMutation.mutate(extendedFormData);
        break;
    }
  };

  const generateRRR = (payment: PaymentHistory) => {
    setLoading(true);
    const paymentData: ExtendedPaymentFormData = {
      amount: payment.amount,
      class: payment.class,
      term: payment.term,
      paymentMethod: "Remita",
    };
    paymentMutation.mutate(paymentData);
  };

  const generateBankTransfer = (payment: PaymentHistory) => {
    setLoading(true);
    const paymentData: ExtendedPaymentFormData = {
      amount: payment.amount,
      class: payment.class,
      term: payment.term,
      paymentMethod: "BankTransfer",
    };
    paymentMutation.mutate(paymentData);
  };

  const printReceipt = (payment: PaymentHistory) => {
    if (!currentUser) {
      showToast({
        message: "User information not available for receipt",
        type: "ERROR",
      });
      return;
    }

    const doc = new jsPDF();

    // Add school header
    doc.setFontSize(20);
    doc.text("Wealthy Home Academy", 105, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text("School Fees Receipt", 105, 35, { align: "center" });

    // Add student details
    doc.setFontSize(12);
    doc.text(
      `Student: ${currentUser.childFirstName} ${currentUser.childSurname}`,
      20,
      60,
    );
    doc.text(`Class: ${payment.class}`, 20, 75);
    doc.text(`Term: ${payment.term}`, 20, 90);
    doc.text(`Amount: ₦${payment.amount.toLocaleString()}`, 20, 105);
    doc.text(`Invoice ID: ${payment.invoiceId}`, 20, 120);
    doc.text(`Status: ${payment.status}`, 20, 135);
    doc.text(
      `Date: ${new Date(payment.createdAt).toLocaleDateString()}`,
      20,
      150,
    );

    if (payment.rrrCode) {
      doc.text(`RRR Code: ${payment.rrrCode}`, 20, 165);
    }

    // Add footer
    doc.setFontSize(10);
    doc.text(
      "This is an official receipt from Bright Stars Primary School",
      105,
      280,
      { align: "center" },
    );

    doc.save(`school_fees_receipt_${payment.invoiceId}.pdf`);
  };

  const getStatusColor = (status: PaymentHistory["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Load payment scripts
  useEffect(() => {
    // Load Paystack
    const paystackScript = document.createElement("script");
    paystackScript.src = "https://js.paystack.co/v1/inline.js";
    document.body.appendChild(paystackScript);

    // Load Flutterwave
    const flutterwaveScript = document.createElement("script");
    flutterwaveScript.src = "https://checkout.flutterwave.com/v3.js";
    document.body.appendChild(flutterwaveScript);

    return () => {
      // Cleanup scripts on unmount
      try {
        document.body.removeChild(paystackScript);
        document.body.removeChild(flutterwaveScript);
      } catch (error) {
        // Scripts might already be removed
        console.log("Scripts cleanup handled");
      }
    };
  }, []);

  return (
    <div className='mt-8 mb-12 shadow-xl w-full mx-auto bg-white rounded-lg'>
      {/* Header */}
      <div className='flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg'>
        <h1 className='text-xl font-bold'>School Fees Payment Portal</h1>
        <div className='text-sm'>
          Student: {currentUser?.childFirstName} {currentUser?.childSurname}
        </div>
      </div>

      {/* Payment History */}
      <div className='p-6'>
        <h2 className='text-xl font-semibold mb-4'>Payment History</h2>
        {paymentHistory.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='min-w-full border border-gray-200 rounded-lg'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-4 py-3 text-left font-medium text-gray-700'>
                    Invoice ID
                  </th>
                  <th className='px-4 py-3 text-left font-medium text-gray-700'>
                    Class
                  </th>
                  <th className='px-4 py-3 text-left font-medium text-gray-700'>
                    Term
                  </th>
                  <th className='px-4 py-3 text-left font-medium text-gray-700'>
                    Amount
                  </th>
                  <th className='px-4 py-3 text-left font-medium text-gray-700'>
                    Status
                  </th>
                  <th className='px-4 py-3 text-left font-medium text-gray-700'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment._id} className='border-t hover:bg-gray-50'>
                    <td className='px-4 py-3 text-sm'>{payment.invoiceId}</td>
                    <td className='px-4 py-3 text-sm'>{payment.class}</td>
                    <td className='px-4 py-3 text-sm'>{payment.term}</td>
                    <td className='px-4 py-3 text-sm'>
                      ₦{payment.amount.toLocaleString()}
                    </td>
                    <td className='px-4 py-3'>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          payment.status,
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex gap-2 flex-wrap'>
                        {payment.status === "Pending" && (
                          <>
                            <button
                              type='button'
                              onClick={() => generateRRR(payment)}
                              className='px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700'
                              disabled={loading}
                            >
                              Generate RRR
                            </button>
                            <button
                              onClick={() => generateBankTransfer(payment)}
                              className='px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700'
                              disabled={loading}
                            >
                              Bank Transfer
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => printReceipt(payment)}
                          className='px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700'
                        >
                          Print Receipt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-gray-500'>No payment history available.</p>
        )}
      </div>

      {/* Payment Form */}
      <div className='p-6 border-t bg-gray-50'>
        <h2 className='text-xl font-semibold mb-4'>Make New Payment</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* Amount */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Amount (₦)
              </label>
              <input
                type='number'
                min={1000}
                {...register("amount", { valueAsNumber: true })}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter amount'
              />
              {errors.amount && (
                <p className='text-red-600 text-sm mt-1'>
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Class */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Class
              </label>
              <select
                {...register("class")}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value=''>Select Class</option>
                <option value='Primary 1'>Primary 1</option>
                <option value='Primary 2'>Primary 2</option>
                <option value='Primary 3'>Primary 3</option>
                <option value='Primary 4'>Primary 4</option>
                <option value='Primary 5'>Primary 5</option>
                <option value='Primary 6'>Primary 6</option>
              </select>
              {errors.class && (
                <p className='text-red-600 text-sm mt-1'>
                  {errors.class.message}
                </p>
              )}
            </div>

            {/* Term */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Term
              </label>
              <select
                {...register("term")}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value=''>Select Term</option>
                <option value='1st Term'>1st Term</option>
                <option value='2nd Term'>2nd Term</option>
                <option value='3rd Term'>3rd Term</option>
              </select>
              {errors.term && (
                <p className='text-red-600 text-sm mt-1'>
                  {errors.term.message}
                </p>
              )}
            </div>
          </div>

          {/* Payment Method Buttons */}
          <div className='mt-6'>
            <h3 className='text-lg font-medium mb-3'>Choose Payment Method:</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
              <button
                type='button'
                onClick={() => handlePaymentMethod("Paystack")}
                className='flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay with Paystack"}
              </button>

              <button
                type='button'
                onClick={() => handlePaymentMethod("Flutterwave")}
                className='flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm bg-orange-600 text-white font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500'
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay with Flutterwave"}
              </button>

              <button
                type='button'
                onClick={() => handlePaymentMethod("Remita")}
                className='flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={loading}
              >
                {loading ? "Processing..." : "Generate Remita RRR"}
              </button>

              <button
                type='button'
                onClick={() => handlePaymentMethod("BankTransfer")}
                className='flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm bg-gray-600 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
                disabled={loading}
              >
                {loading ? "Processing..." : "Bank Transfer"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolFeesPayment;
