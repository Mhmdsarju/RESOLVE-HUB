import { OrganizationVerificationStatus } from "../enums/organizationVerificationStatus.enum";

interface OrganizationVerificationProps {
  id?: string;
  organizationId: string;
  reviewedBy?: string | null;
  status: OrganizationVerificationStatus;
  rejectionReason?: string | null;
  submittedAt?: Date | null;
  reviewedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class OrganizationVerification {
  public readonly id?: string;
  public organizationId: string;
  public reviewedBy?: string | null;
  public status: OrganizationVerificationStatus;
  public rejectionReason?: string | null;
  public submittedAt?: Date | null;
  public reviewedAt?: Date | null;
  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: OrganizationVerificationProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this.reviewedBy = props.reviewedBy;
    this.status = props.status;
    this.rejectionReason = props.rejectionReason;
    this.submittedAt = props.submittedAt;
    this.reviewedAt = props.reviewedAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}