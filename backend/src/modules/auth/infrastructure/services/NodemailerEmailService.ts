import nodemailer from "nodemailer";
import { IEmailService } from "../../domain/interfaces/IEmailService";

export class NodemailerEmailService implements IEmailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASSWORD!,
    },
  });

  async sendOtp(email: string, otp: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "ResolveHub - Password Reset OTP",
      html: `
        <h2>ResolveHub</h2>
        <p>Your password reset OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });
  }
}