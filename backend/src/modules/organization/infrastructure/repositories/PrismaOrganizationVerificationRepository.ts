import { injectable } from "inversify";

import { prisma } from "../../../../config/database";

import { OrganizationVerification } from "../../domain/entities/organizationVerification.entity";
import {
    IOrganizationVerificationRepository,
    PendingOrganizationVerification, OrganizationVerificationDetails
} from "../../domain/repositories/IOrganizationVerificationRepository";

import { OrganizationVerificationMapper } from "../mappers/OrganizationVerificationMapper";

@injectable()
export class PrismaOrganizationVerificationRepository
    implements IOrganizationVerificationRepository {

    async create(verification: OrganizationVerification,): Promise<OrganizationVerification> {
        const createdVerification = await prisma.organizationVerification.create({
            data: OrganizationVerificationMapper.toDb(verification),
        });

        return OrganizationVerificationMapper.fromDb(
            createdVerification,
        );
    }

    async findById(id: string,): Promise<OrganizationVerification | null> {
        const verification = await prisma.organizationVerification.findUnique({
            where: { id },
        });

        if (!verification) {
            return null;
        }

        return OrganizationVerificationMapper.fromDb(
            verification,
        );
    }

    async findAll(): Promise<OrganizationVerification[]> {
        const verifications = await prisma.organizationVerification.findMany();

        return verifications.map(
            OrganizationVerificationMapper.fromDb,
        );
    }

    async update(id: string, data: Partial<OrganizationVerification>,): Promise<OrganizationVerification> {
        const updatedVerification = await prisma.organizationVerification.update({
            where: { id },
            data: OrganizationVerificationMapper.toDbUpdate(
                data,
            ),
        });

        return OrganizationVerificationMapper.fromDb(
            updatedVerification,
        );
    }

    async delete(id: string): Promise<void> {
        await prisma.organizationVerification.delete({
            where: { id },
        });
    }

    async findLatestByOrganizationId(organizationId: string,): Promise<OrganizationVerification | null> {
        const verification = await prisma.organizationVerification.findFirst({
            where: {
                organizationId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!verification) {
            return null;
        }

        return OrganizationVerificationMapper.fromDb(
            verification,
        );
    }

    async findPending(): Promise<PendingOrganizationVerification[]> {
        const verifications =
            await prisma.organizationVerification.findMany({
                where: {
                    status: "PENDING",
                },
                include: {
                    organization: true,
                },
                orderBy: {
                    submittedAt: "asc",
                },
            });

        return verifications.map((verification) => ({
            verificationId: verification.id,
            organizationId: verification.organizationId,
            organizationName: verification.organization.name,
            industry: verification.organization.industry,
            companySize: verification.organization.companySize,
            submittedAt: verification.submittedAt,
            status: OrganizationVerificationMapper.toDomainStatus(
                verification.status,
            ),
        }));
    }
    async findHistoryByOrganizationId(organizationId: string,): Promise<OrganizationVerification[]> {
        const verifications = await prisma.organizationVerification.findMany({
            where: {
                organizationId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return verifications.map(OrganizationVerificationMapper.fromDb,);
    }

    async findDetailsByOrganizationId(organizationId: string,): Promise<OrganizationVerificationDetails | null> {
        const verification = await prisma.organizationVerification.findFirst({
            where: {
                organizationId,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                organization: true,
            },
        });

        if (!verification) {
            return null;
        }

        return {
            verification: OrganizationVerificationMapper.fromDb(
                verification,
            ),

            organization: {
                id: verification.organization.id,
                name: verification.organization.name,
                industry: verification.organization.industry,
                companySize: verification.organization.companySize,
                website: verification.organization.website,
                description: verification.organization.description,
                phone: verification.organization.phone,
                country: verification.organization.country,
                state: verification.organization.state,
                city: verification.organization.city,
                address: verification.organization.address,
                status: verification.organization.status,
            },
        };
    }



}