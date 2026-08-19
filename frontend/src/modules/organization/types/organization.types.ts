export type OrganizationStatus =
  | "PENDING_PROFILE"
  | "PENDING_VERIFICATION"
  | "ACTIVE"
  | "REJECTED"
  | "SUSPENDED";

export interface Organization {
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
  status: OrganizationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateOrganizationDto {
  name: string;
  industry: string;
  companySize: string;
  website?: string;
  description?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
}

export type OrganizationVerificationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface OrganizationVerification {
  id: string;
  organizationId: string;
  status: OrganizationVerificationStatus;
  rejectionReason: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PendingOrganizationVerification {
  verificationId: string;
  organizationId: string;
  organizationName: string;
  industry: string | null;
  companySize: string | null;
  submittedAt: string | null;
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