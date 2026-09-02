import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { OrganizationStatus } from "../../domain/enums/organizationStatus.enum";
import { OrganizationVerification } from "../../domain/entities/organizationVerification.entity";
import { OrganizationVerificationStatus } from "../../domain/enums/organizationVerificationStatus.enum";

import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { IOrganizationVerificationRepository } from "../../domain/repositories/IOrganizationVerificationRepository";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";

import { ISubmitOrganizationVerificationUseCase } from "../../domain/interfaces/ISubmitOrganizationVerificationUseCase";
import { KafkaTopics } from "@/shared/constant/kafka.topics";
import { IEventPublisher } from "../../domain/interfaces/IEventPublisher";

export class SubmitOrganizationVerificationUseCase implements ISubmitOrganizationVerificationUseCase {
    constructor(
        private readonly organizationRepository: IOrganizationRepository,
        private readonly verificationRepository: IOrganizationVerificationRepository,
        private readonly userRepository: IUserRepository,
        private readonly eventPublisher: IEventPublisher,
    ) { }

    async execute(organizationId: string,): Promise<OrganizationVerification> {

        const organization = await this.organizationRepository.findById(organizationId);

        if (!organization) {
            throw new AppError("Organization not found", HttpStatusCode.NOT_FOUND,);
        }

        if (organization.status !== OrganizationStatus.PENDING_PROFILE && organization.status !== OrganizationStatus.REJECTED) {
            throw new AppError("Organization cannot be submitted for verification", HttpStatusCode.BAD_REQUEST,);
        }

        if (!organization.industry) {
            throw new AppError("Industry is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!organization.companySize) {
            throw new AppError("Company size is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!organization.phone) {
            throw new AppError("Phone number is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!organization.country) {
            throw new AppError("Country is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!organization.state) {
            throw new AppError("State is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!organization.city) {
            throw new AppError("City is required", HttpStatusCode.BAD_REQUEST,);
        }

        const admin = await this.userRepository.findOrganizationAdminByOrganizationId(organizationId,);

        if (!admin) {
            throw new AppError("Organization admin not found", HttpStatusCode.NOT_FOUND,);
        }

        const verification = new OrganizationVerification({
            organizationId,
            status: OrganizationVerificationStatus.PENDING,
            submittedAt: new Date(),
        });

        const createdVerification = await this.verificationRepository.create(verification);

        await this.organizationRepository.update(
            organizationId,
            {
                status: OrganizationStatus.PENDING_VERIFICATION,
            },
        );

        await this.eventPublisher.publish(
            KafkaTopics.EMAIL_EVENTS,
            {
                event: "ORGANIZATION_VERIFICATION_SUBMITTED",
                email: admin.email,
                organizationName: organization.name,
            },
        );

        return createdVerification;
    }
}