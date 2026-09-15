import { IBaseRepository } from "../../../../shared/base/repositories/IBaseRepository";
import { OrganizationVerification } from "../entities/organizationVerification.entity";
import { OrganizationVerificationStatus } from "../enums/organizationVerificationStatus.enum";

export interface PendingOrganizationVerification {
  verificationId: string;
  organizationId: string;
  organizationName: string;
  industry: string | null;
  companySize: string | null;
  submittedAt: Date | null;
  status: OrganizationVerificationStatus;
}

export interface OrganizationVerificationDetails {
  verification: OrganizationVerification;
  organization: {
    id: string;
    name: string;
    industry: string | null;
    companySize: string | null;
    website: string | null;
    description: string | null;
    phone: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    address: string | null;
    status: string;
  };
}

export interface IOrganizationVerificationRepository extends IBaseRepository<OrganizationVerification> {
  findLatestByOrganizationId(organizationId: string,): Promise<OrganizationVerification | null>;

  findPending(): Promise<PendingOrganizationVerification[]>;

  findHistoryByOrganizationId(organizationId: string,): Promise<OrganizationVerification[]>;

  findDetailsByOrganizationId(organizationId: string,): Promise<OrganizationVerificationDetails | null>;
}