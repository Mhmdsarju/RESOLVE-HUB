import { AppError } from "../../../../shared/errors/AppError";

import { OrganizationStatus } from "../../domain/enums/organizationStatus.enum";
import { OrganizationVerificationStatus } from "../../domain/enums/organizationVerificationStatus.enum";

import { OrganizationVerification } from "../../domain/entities/organizationVerification.entity";

import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { IOrganizationVerificationRepository } from "../../domain/repositories/IOrganizationVerificationRepository";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";

import { IApproveOrganizationVerificationUseCase } from "../../domain/interfaces/IApproveOrganizationVerificationUseCase";

import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IEventPublisher } from "../../domain/interfaces/IEventPublisher";
import { KafkaTopics } from "@/shared/constant/kafka.topics";
import { ICreateFreeSubscriptionUseCase } from "@/modules/subscription/domain/interface/use-cases/ICreateFreeSubscriptionUseCase";



export class ApproveOrganizationVerificationUseCase implements IApproveOrganizationVerificationUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
    private readonly verificationRepository: IOrganizationVerificationRepository,
    private readonly userRepository: IUserRepository,
    private readonly eventPublisher: IEventPublisher,
    private readonly createFreeSubscriptionUseCase: ICreateFreeSubscriptionUseCase,
  ) { }

  async execute(organizationId: string, reviewerId: string,): Promise<OrganizationVerification> {
    const organization = await this.organizationRepository.findById(organizationId);

    if (!organization) {
      throw new AppError("Organization not found", HttpStatusCode.NOT_FOUND);
    }

    if (organization.status !== OrganizationStatus.PENDING_VERIFICATION) {
      throw new AppError("Organization is not pending verification", HttpStatusCode.BAD_REQUEST,);
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
      throw new AppError("Organization admin not found", 404,);
    }

    const updatedVerification = await this.verificationRepository.update(
      verification.id!,
      {
        status: OrganizationVerificationStatus.APPROVED,
        reviewedBy: reviewerId,
        reviewedAt: new Date(),
      },
    );

    await this.organizationRepository.update(
      organizationId,
      {
        status: OrganizationStatus.ACTIVE,
      },
    );

    await this.createFreeSubscriptionUseCase.execute(organizationId);

    await this.eventPublisher.publish(
      KafkaTopics.EMAIL_EVENTS,
      {
        event: "ORGANIZATION_APPROVED",
        email: admin.email,
        organizationName: organization.name,
      },
    );

    return updatedVerification;
  }
}