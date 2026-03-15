import dotenv from "dotenv";
dotenv.config();
import { transporter } from "../config/mail";

export const sendVerificationEmail = async (email: string, code: string) => {
  await transporter.sendMail({
    from: `"IskoMarket" <${process.env.EMAIL_USER}>`,
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
