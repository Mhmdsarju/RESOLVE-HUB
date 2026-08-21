import {
  OrganizationVerification as PrismaOrganizationVerification,
  OrganizationVerificationStatus as PrismaVerificationStatus,
} from "@prisma/client";

import { OrganizationVerification } from "../../domain/entities/organizationVerification.entity";
import { OrganizationVerificationStatus } from "../../domain/enums/organizationVerificationStatus.enum";

export class OrganizationVerificationMapper {
  static toDomainStatus(
    status: PrismaVerificationStatus,
  ): OrganizationVerificationStatus {
    switch (status) {
      case PrismaVerificationStatus.PENDING:
        return OrganizationVerificationStatus.PENDING;

      case PrismaVerificationStatus.APPROVED:
        return OrganizationVerificationStatus.APPROVED;

      case PrismaVerificationStatus.REJECTED:
        return OrganizationVerificationStatus.REJECTED;

      default:
        throw new Error(
          `Unknown organization verification status: ${status}`,
        );
    }
  }

  static toPrismaStatus(
    status: OrganizationVerificationStatus,
  ): PrismaVerificationStatus {
    switch (status) {
      case OrganizationVerificationStatus.PENDING:
        return PrismaVerificationStatus.PENDING;

      case OrganizationVerificationStatus.APPROVED:
        return PrismaVerificationStatus.APPROVED;

      case OrganizationVerificationStatus.REJECTED:
        return PrismaVerificationStatus.REJECTED;

      default:
        throw new Error(
          `Unknown organization verification status: ${status}`,
        );
    }
  }

  static fromDb(
    verification: PrismaOrganizationVerification,
  ): OrganizationVerification {
    return new OrganizationVerification({
      id: verification.id,

      organizationId: verification.organizationId,

      reviewedBy: verification.reviewedBy,

      status: this.toDomainStatus(verification.status),

      rejectionReason: verification.rejectionReason,

      submittedAt: verification.submittedAt,

      reviewedAt: verification.reviewedAt,

      createdAt: verification.createdAt,

      updatedAt: verification.updatedAt,
    });
  }

  static toDb(verification: OrganizationVerification) {
    return {
      organizationId: verification.organizationId,

      reviewedBy: verification.reviewedBy,

      status: this.toPrismaStatus(verification.status),

      rejectionReason: verification.rejectionReason,

      submittedAt: verification.submittedAt,

      reviewedAt: verification.reviewedAt,
    };
  }

  static toDbUpdate(
    data: Partial<OrganizationVerification>,
  ) {
    return {
      ...(data.reviewedBy !== undefined && {
        reviewedBy: data.reviewedBy,
      }),

      ...(data.status !== undefined && {
        status: this.toPrismaStatus(data.status),
      }),

      ...(data.rejectionReason !== undefined && {
        rejectionReason: data.rejectionReason,
      }),

      ...(data.submittedAt !== undefined && {
        submittedAt: data.submittedAt,
      }),

      ...(data.reviewedAt !== undefined && {
        reviewedAt: data.reviewedAt,
      }),
    };
  }
}