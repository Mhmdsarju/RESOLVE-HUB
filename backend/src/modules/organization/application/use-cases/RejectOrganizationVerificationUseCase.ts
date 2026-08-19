import { inject, injectable } from "inversify";

import { TYPES } from "../../../../config/types";
import { AppError } from "../../../../shared/errors/AppError";

import { OrganizationStatus } from "../../domain/enums/organizationStatus.enum";
import { OrganizationVerificationStatus } from "../../domain/enums/organizationVerificationStatus.enum";

import { OrganizationVerification } from "../../domain/entities/organizationVerification.entity";

import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { IOrganizationVerificationRepository } from "../../domain/repositories/IOrganizationVerificationRepository";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";

import { IRejectOrganizationVerificationUseCase } from "../../domain/interfaces/IRejectOrganizationVerificationUseCase";
import { IOrganizationEmailService } from "../../domain/interfaces/IOrganizationEmailService";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

@injectable()
export class RejectOrganizationVerificationUseCase
  implements IRejectOrganizationVerificationUseCase {
  constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,

    @inject(TYPES.OrganizationVerificationRepository)
    private readonly verificationRepository: IOrganizationVerificationRepository,

    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES.OrganizationEmailService)
    private readonly organizationEmailService: IOrganizationEmailService,
  ) { }

  async execute(organizationId: string, reviewerId: string, reason: string,): Promise<OrganizationVerification> {
    const organization = await this.organizationRepository.findById(organizationId);

    if (!organization) {
      throw new AppError("Organization not found", HttpStatusCode.NOT_FOUND);
    }

    if (organization.status !== OrganizationStatus.PENDING_VERIFICATION) {
      throw new AppError("Organization is not pending verification", HttpStatusCode.BAD_REQUEST,);
    }

    if (!reason.trim()) {
      throw new AppError("Rejection reason is required", HttpStatusCode.BAD_REQUEST,);
    }

    const verification = await this.verificationRepository.findLatestByOrganizationId(organizationId,);

    if (!verification) {
      throw new AppError("Verification request not found", HttpStatusCode.NOT_FOUND,);
    }

    if (verification.status !== OrganizationVerificationStatus.PENDING) {
      throw new AppError("Verification request has already been reviewed", HttpStatusCode.BAD_REQUEST,);
    }

    const admin = await this.userRepository.findOrganizationAdminByOrganizationId(organizationId,);

    if (!admin) {
      throw new AppError("Organization admin not found", HttpStatusCode.NOT_FOUND,);
    }

    const rejectionReason = reason.trim();

    const updatedVerification = await this.verificationRepository.update(
      verification.id!,
      {
        status: OrganizationVerificationStatus.REJECTED,
        reviewedBy: reviewerId,
        reviewedAt: new Date(),
        rejectionReason,
      },
    );

    await this.organizationRepository.update(
      organizationId,
      {
        status: OrganizationStatus.REJECTED,
      },
    );

    try {
      await this.organizationEmailService.sendOrganizationRejectedEmail(
        admin.email,
        organization.name,
        rejectionReason,
      );
    } catch (error) {
      console.error(
        "Failed to send organization rejection email:",
        error,
      );
    }

    return updatedVerification;
  }
}