import nodemailer from "nodemailer";

import { IEmailService } from "../../domain/interfaces/IEmailService";

import { signupOtpTemplate } from "../templates/signupOtpTemplate";
import { forgotPasswordOtpTemplate } from "../templates/forgotPasswordOtpTemplate";
import { injectable } from "inversify";
import { teamInvitationTemplate } from "../templates/teamInvitationTemplate";

@injectable()
export class NodemailerEmailService implements IEmailService {

  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASSWORD!,
    },
  });

  async sendSignupOtp(email: string, otp: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"ResolveHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "ResolveHub - Verify Your Email",
      html: signupOtpTemplate(otp),

      attachments: [
        {
          filename: "resolvehub-logo.png",
          path: "src/assets/resolvehub-logo.png",
          cid: "resolvehub-logo",
        },
      ],

    });
  }

  async sendForgotPasswordOtp(email: string, otp: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"ResolveHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "ResolveHub - Password Reset OTP",
      html: forgotPasswordOtpTemplate(otp),

      attachments: [
        {
          filename: "resolvehub-logo.png",
          path: "src/assets/resolvehub-logo.png",
          cid: "resolvehub-logo",
        },
      ],

    });
  }

  async sendTeamInvitationEmail(email: string, inviteLink: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"ResolveHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "ResolveHub - Team Invitation",
      html: teamInvitationTemplate(inviteLink),

      attachments: [
        {
          filename: "resolvehub-logo.png",
          path: "src/assets/resolvehub-logo.png",
          cid: "resolvehub-logo",
        },
      ],
    });
  }

}