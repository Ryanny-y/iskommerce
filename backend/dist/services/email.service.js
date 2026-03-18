"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mail_1 = require("../config/mail");
const sendVerificationEmail = async (email, code) => {
    await mail_1.transporter.sendMail({
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
exports.sendVerificationEmail = sendVerificationEmail;
