import dotenv from "dotenv";
dotenv.config();
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendVerificationEmail = async (email: string, code: string) => {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Email Verification Code",
    html: `
      <h2>Email Verification</h2>
      <p>Your verification code is:</p>
      <h1>${code}</h1>
      <p>This code will expire in 10 minutes.</p>
    `,
  });
};