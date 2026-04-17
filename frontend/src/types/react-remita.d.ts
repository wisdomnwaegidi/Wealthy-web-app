declare module "react-remita" {
  import { FC } from "react";

  interface RemitaData {
    key: string;
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    amount: number;
    narration: string;
    rrr: string;
  }

  interface RemitaSuccessResponse {
    status: "success";
    transactionId: string;
    message: string;
    reference: string;
  }

  interface RemitaErrorResponse {
    status: "error";
    code: string;
    message: string;
  }

  interface RemitaProps {
    remitaData: RemitaData;
    onSuccess: (response: RemitaSuccessResponse) => void;
    onError: (error: RemitaErrorResponse) => void;
  }

  const RemitaPayment: FC<RemitaProps>;
  export default RemitaPayment;
}
