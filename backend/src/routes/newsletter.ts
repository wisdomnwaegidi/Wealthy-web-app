import express, { Request, Response } from "express";
import User from "../models/user";
import { check, validationResult } from "express-validator";
import { sendNewsletterConfirmation } from "../utils/mailer";

const router = express.Router();

// Newsletter registration
router.post(
  "/newsletter",
  [check("parentsEmail", "Email is required").isEmail().toLowerCase()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { parentsEmail } = req.body;

      const user = await User.findOneAndUpdate(
        { parentsEmail },
        { subscribed: true },
        { new: true },
      );

      // Send confirmation email regardless of whether user exists
      await sendNewsletterConfirmation(parentsEmail); 

      return res.status(200).json({ message: "Subscribed successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
