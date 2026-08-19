import nodemailer from "nodemailer";
import { injectable } from "inversify";

import { IOrganizationEmailService } from "../../domain/interfaces/IOrganizationEmailService";

import { organizationRegistrationSuccessTemplate } from "../templates/organizationRegistrationSuccess.template";
import { organizationVerificationSubmittedTemplate } from "../templates/organizationVerificationSubmitted.template";
import { organizationApprovedTemplate } from "../templates/organizationApproved.template";
import { organizationRejectedTemplate } from "../templates/organizationRejected.template";

@injectable()
export class NodemailerOrganizationEmailService implements IOrganizationEmailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASSWORD!,
    },
  });

  async sendRegistrationSuccessEmail(email: string, organizationName: string,): Promise<void> {
    await this.transporter.sendMail({
      from: `"ResolveHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "ResolveHub - Organization Registered Successfully",
      html: organizationRegistrationSuccessTemplate(organizationName,),
      attachments: [
        {
          filename: "resolvehub-logo.png",
          path: "src/assets/resolvehub-logo.png",
          cid: "resolvehub-logo",
        },
      ],
    });
  }

  async sendVerificationSubmittedEmail(email: string, organizationName: string,): Promise<void> {
    await this.transporter.sendMail({
      from: `"ResolveHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "ResolveHub - Verification Submitted",
      html: organizationVerificationSubmittedTemplate(organizationName,),
      attachments: [
        {
          filename: "resolvehub-logo.png",
          path: "src/assets/resolvehub-logo.png",
          cid: "resolvehub-logo",
        },
      ],
    });
  }

  async sendOrganizationApprovedEmail(email: string, organizationName: string,): Promise<void> {
    await this.transporter.sendMail({
      from: `"ResolveHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "ResolveHub - Organization Approved",
      html: organizationApprovedTemplate(organizationName,),
      attachments: [
        {
          filename: "resolvehub-logo.png",
          path: "src/assets/resolvehub-logo.png",
          cid: "resolvehub-logo",
        },
      ],
    });
  }

  async sendOrganizationRejectedEmail(email: string, organizationName: string, reason: string,): Promise<void> {
    await this.transporter.sendMail({
      from: `"ResolveHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "ResolveHub - Verification Requires Changes",
      html: organizationRejectedTemplate(organizationName, reason,),
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