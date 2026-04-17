import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import User from "../models/email";

const router = express.Router();

// Configure your mail transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

router.post(
  "/forgot-password",
  check("parentsEmail")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  async (req: Request, res: Response) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { parentsEmail } = req.body;

      const user = await User.findOne({ parentsEmail });

      if (!user) {
        // Send generic response to avoid email enumeration attacks
        return res
          .status(400)
          .send({ message: "If the email exists, a reset link will be sent" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1h" },
      );

      user.resetToken = token;
      user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry

      await user.save();

      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: user.parentsEmail,
        subject: "Password Reset",
        html: `<p>Click on this link to reset your password: <span><a href="${resetLink}">Reset Password</a></span></p>`,
      };

      transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).send({ message: "Error sending email" });
        }
        // console.log("Email sent successfully:", info);
        res.status(200).send({
          message: "If the email exists, a reset link will be sent",
        });
      });
    } catch (error) {
      console.error("Error during forgot password process:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
);

export default router;
