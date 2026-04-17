import { z } from "zod";

export const paymentSchema = z.object({
  amount: z.number().min(1000, "Minimum amount is ₦1,000"),
  class: z.enum([
    "Primary 1", "Primary 2", "Primary 3", 
    "Primary 4", "Primary 5", "Primary 6"
  ], { errorMap: () => ({ message: "Please select a valid class" }) }),
  term: z.enum(["1st Term", "2nd Term", "3rd Term"], {
    errorMap: () => ({ message: "Please select a valid term" })
  }),
  paymentMethod: z.enum(["Paystack", "Flutterwave", "Remita", "BankTransfer"]).optional()
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

// Extended type for API calls that require paymentMethod
export interface ExtendedPaymentFormData extends PaymentFormData {
  paymentMethod: "Paystack" | "Flutterwave" | "Remita" | "BankTransfer";
}

// Updated PaymentHistory interface
export interface PaymentHistory {
  _id: string;
  invoiceId: string;
  amount: number;
  class: "Primary 1" | "Primary 2" | "Primary 3" | "Primary 4" | "Primary 5" | "Primary 6";
  term: "1st Term" | "2nd Term" | "3rd Term";
  paymentMethod: "Paystack" | "Flutterwave" | "Remita" | "BankTransfer";
  status: "Pending" | "Completed" | "Failed";
  createdAt: string;
  rrrCode?: string;
  transactionRef?: string;
}

// Updated PaymentData interface for API calls
export interface PaymentData {
  amount: number;
  class: "Primary 1" | "Primary 2" | "Primary 3" | "Primary 4" | "Primary 5" | "Primary 6";
  term: "1st Term" | "2nd Term" | "3rd Term";
  paymentMethod: "Paystack" | "Flutterwave" | "Remita" | "BankTransfer";
  rrrInvoice?: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data?: {
    rrrCode?: string;
    paymentUrl?: string;
    reference?: string;
    bankDetails?: string;
  };
}