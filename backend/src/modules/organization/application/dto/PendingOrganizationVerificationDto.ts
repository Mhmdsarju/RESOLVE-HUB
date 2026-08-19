import { OrganizationVerificationStatus } from "../../domain/enums/organizationVerificationStatus.enum"; 

export interface PendingOrganizationVerificationDto {
  verificationId: string;
  organizationId: string;
  organizationName: string;
  industry: string | null;
  companySize: string | null;
  submittedAt: Date | null;
  status: OrganizationVerificationStatus;
}