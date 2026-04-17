import crypto from "crypto";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/webhook/remita", (req: Request, res: Response) => {
  const secret = "YOUR_WEBHOOK_SECRET"; // Obtain this from Remita
  const signature = req.headers["x-signature"]; // Replace with actual header key from Remita
  const payload = JSON.stringify(req.body);

  // Compute HMAC
  const hash = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  // Verify signature
  if (hash !== signature) {
    return res.status(403).json({ error: "Invalid signature" });
  }

  // Process valid webhook
  console.log("Valid webhook received:", req.body);
  res.status(200).json({ message: "Webhook processed" });
});
