export interface IOrganizationEmailService {
  sendRegistrationSuccessEmail(email: string, organizationName: string,): Promise<void>;

  sendVerificationSubmittedEmail(email: string, organizationName: string,): Promise<void>;

  sendOrganizationApprovedEmail(email: string, organizationName: string,): Promise<void>;

  sendOrganizationRejectedEmail(email: string, organizationName: string, reason: string,): Promise<void>;

  sendSubscriptionExpiring10DaysEmail(email: string, organizationName: string, endDate: Date,): Promise<void>;

  sendSubscriptionExpiring2DaysEmail(email: string, organizationName: string, endDate: Date,): Promise<void>;
}