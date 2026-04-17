import { Router, Request, Response } from "express";
import Payment from "../models/payment";
import User from "../models/user";
import verifyToken from "../middleware/auth";
import crypto from "crypto";
import axios from "axios";
import { check, validationResult } from "express-validator";

const router = Router();

// GET payment history
router.get("/history", verifyToken, async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const payments = await Payment.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.json(payments);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ error: "Failed to fetch payment history" });
  }
});

// POST process payment
router.post(
  "/process",
  [
    check("amount", "Amount is required").notEmpty().trim(),
    check("studentClass", "Student class is required").notEmpty().trim(),
    check("paymentMethod").notEmpty().trim(),
  ],
  verifyToken,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { amount, class: studentClass, term, paymentMethod } = req.body;

      // Validate required fields
      /*  if (!amount || !studentClass || !term || !paymentMethod) {
        return res.status(400).json({
          success: false,
          message: "Amount, class, term, and payment method are required",
        });
      } */

      // Validate amount
      if (amount < 40000) {
        return res.status(400).json({
          message: "Minimum payment amount is ₦40,000",
        });
      }

      // Generate unique invoice ID
      const invoiceId = `SF${Date.now()}${Math.random()
        .toString(36)
        .substr(2, 4)
        .toUpperCase()}`;

      // Create payment record
      const payment = new Payment({
        userId: req.userId,
        invoiceId,
        class: studentClass,
        term,
        amount,
        paymentMethod,
        status: "Pending",
      });

      await payment.save();

      let responseData: any = {};

      // Process payment based on method
      try {
        switch (paymentMethod) {
          case "Remita":
            responseData = await generateRemitaRRR(payment, req.userId);
            break;
          case "BankTransfer":
            responseData = await generateBankTransferDetails(payment);
            break;
          case "Paystack":
            responseData = {
              reference: invoiceId,
              paymentUrl: `https://checkout.paystack.com/${invoiceId}`,
              message: "Payment initiated successfully",
            };
            break;
          case "Flutterwave":
            responseData = {
              reference: invoiceId,
              message: "Payment initiated successfully",
            };
            break;
          default:
            return res.status(400).json({
              success: false,
              message: "Invalid payment method",
            });
        }
      } catch (paymentError) {
        // Update payment status to failed if payment processing fails
        await Payment.findByIdAndUpdate(payment._id, {
          status: "Failed",
          updatedAt: new Date(),
        });

        throw paymentError;
      }

      res.json({
        success: true,
        message: "Payment processed successfully",
        data: responseData,
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Payment processing failed",
      });
    }
  },
);

// GET verify payment
router.get(
  "/verify/:reference",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { reference } = req.params;
      const { paymentMethod } = req.query as { paymentMethod?: string };

      if (!paymentMethod) {
        return res.status(400).json({
          success: false,
          message: "Payment method is required for verification",
        });
      }

      let verificationResult: any;

      switch (paymentMethod.toLowerCase()) {
        case "paystack":
          verificationResult = await verifyPaystackPayment(reference);
          break;
        case "flutterwave":
          verificationResult = await verifyFlutterwavePayment(reference);
          break;
        default:
          return res.status(400).json({
            success: false,
            message: "Payment method not supported for verification",
          });
      }

      // Update payment status in database
      if (verificationResult.success) {
        await Payment.findOneAndUpdate(
          { invoiceId: reference },
          {
            status: "Completed",
            transactionRef: verificationResult.transactionId,
            updatedAt: new Date(),
          },
        );
      }

      res.json(verificationResult);
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  },
);

// Helper function to generate Remita RRR
async function generateRemitaRRR(payment: any, userId: string) {
  try {
    // Fetch user information from database
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const remitaData = {
      serviceTypeId: process.env.REMITA_SERVICE_TYPE_ID as string,
      amount: payment.amount,
      orderId: payment.invoiceId,
      payerName: user.parentNames,
      payerEmail: user.parentsEmail,
      // payerPhone: user.parentsPhone || "08012345678",
      description: `School fees payment for ${payment.class} - ${payment.term}`,
      customFields: [
        {
          name: "studentClass",
          value: payment.class,
        },
        {
          name: "term",
          value: payment.term,
        },
        {
          name: "studentName",
          value: `${user.childFirstName} ${user.childSurname}`,
        },
        {
          name: "parentName",
          value: user.parentNames,
        },
        {
          name: "userId",
          value: userId,
        },
      ],
    };

    // Generate hash for Remita API
    const hash = crypto
      .createHash("sha512")
      .update(
        ((((process.env.REMITA_MERCHANT_ID as string) +
          process.env.REMITA_SERVICE_TYPE_ID) as string) +
          payment.invoiceId +
          payment.amount +
          process.env.REMITA_API_KEY) as string,
      )
      .digest("hex");

    const response = await axios.post(
      `${
        process.env.REMITA_BASE_URL as string
      }/echannelsvc/merchant/api/paymentinit`,
      {
        ...remitaData,
        hash,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `remitaConsumerKey=${
            process.env.REMITA_PUBLIC_KEY as string
          },remitaConsumerToken=${hash}`,
        },
      },
    );

    if (response.data.status === "01") {
      // Update payment with RRR code
      await Payment.findByIdAndUpdate(payment._id, {
        rrrCode: response.data.RRR,
      });

      return {
        rrrCode: response.data.RRR,
        message: "RRR code generated successfully",
      };
    } else {
      throw new Error(response.data.statusMessage || "RRR generation failed");
    }
  } catch (error) {
    console.error("Remita RRR generation error:", error);
    throw new Error("Failed to generate RRR code");
  }
}

// Helper function to generate bank transfer details
async function generateBankTransferDetails(payment: any) {
  const bankDetails = `Bank Name: Opay
Account Name: Wisdom Nwaegidi ifechiluru
Account Number: 9031916620
Payment Details:
Amount: ₦${payment.amount.toLocaleString()}
Reference: ${payment.invoiceId}
Class: ${payment.class}
Term: ${payment.term}

Please use the reference number when making your transfer.`;

  return {
    bankDetails,
    message: "Bank transfer details generated successfully",
  };
}

// Helper function to verify Paystack payment
async function verifyPaystackPayment(reference: string) {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    if (response.data.data.status === "success") {
      return {
        success: true,
        message: "Payment verified successfully",
        transactionId: response.data.data.reference,
        amount: response.data.data.amount / 100,
      };
    } else {
      return {
        success: false,
        message: "Payment verification failed",
      };
    }
  } catch (error) {
    console.error("Paystack verification error:", error);
    return {
      success: false,
      message: "Error verifying Paystack payment",
    };
  }
}

// Helper function to verify Flutterwave payment
async function verifyFlutterwavePayment(reference: string) {
  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${reference}/verify`,
      {
        headers: {
          Authorization: `Bearer ${
            process.env.FLUTTERWAVE_SECRET_KEY as string
          }`,
        },
      },
    );

    if (
      response.data.status === "success" &&
      response.data.data.status === "successful"
    ) {
      return {
        success: true,
        message: "Payment verified successfully",
        transactionId: response.data.data.id.toString(),
        amount: response.data.data.amount,
      };
    } else {
      return {
        success: false,
        message: "Payment verification failed",
      };
    }
  } catch (error) {
    console.error("Flutterwave verification error:", error);
    return {
      success: false,
      message: "Error verifying Flutterwave payment",
    };
  }
}

export default router;
