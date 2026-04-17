import nodemailer from "nodemailer";

// Single shared transporter instance
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER as string,
    pass: process.env.GMAIL_PASS as string,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.BACKEND_URL}/api/users/verify-email/${token}`;

  await transporter.sendMail({
    from: process.env.GMAIL_USER as string,
    to: email,
    subject: "Email Verification",
    html: `
      <h1>Verify Your Email</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationLink}">Verify Email</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  });
}

export async function sendNewsletterConfirmation(email: string) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER as string,
    to: email,
    subject: "You're subscribed to Wealthy Home Academy!",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2>Welcome to Our Newsletter!</h2>
        <p>Thank you for subscribing to Wealthy Home Academy's newsletter.</p>
        <p>You'll receive updates on academic resources, events, and more.</p>
        <br/>
        <p>— The Wealthy Home Academy Team</p>
      </div>
    `,
  });
}
