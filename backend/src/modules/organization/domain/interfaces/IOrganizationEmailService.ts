export interface IOrganizationEmailService {
  sendRegistrationSuccessEmail(email: string, organizationName: string,): Promise<void>;

  sendVerificationSubmittedEmail(email: string, organizationName: string,): Promise<void>;

  sendOrganizationApprovedEmail(email: string, organizationName: string,): Promise<void>;

  sendOrganizationRejectedEmail(email: string, organizationName: string, reason: string,): Promise<void>;
}