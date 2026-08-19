import { inject, injectable } from "inversify";

import { TYPES } from "../../../../config/types";

import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { OrganizationStatus } from "../../domain/enums/organizationStatus.enum";
import { OrganizationVerification } from "../../domain/entities/organizationVerification.entity";
import { OrganizationVerificationStatus } from "../../domain/enums/organizationVerificationStatus.enum";

import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { IOrganizationVerificationRepository } from "../../domain/repositories/IOrganizationVerificationRepository";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";

import { ISubmitOrganizationVerificationUseCase } from "../../domain/interfaces/ISubmitOrganizationVerificationUseCase";
import { IOrganizationEmailService } from "../../domain/interfaces/IOrganizationEmailService";

@injectable()
export class SubmitOrganizationVerificationUseCase implements ISubmitOrganizationVerificationUseCase {

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

        try {
            await this.organizationEmailService.sendVerificationSubmittedEmail(
                admin.email,
                organization.name,
            );
        } catch (error) {
            console.error(
                "Failed to send verification submitted email:",
                error,
            );
        }

        return createdVerification;
    }
}