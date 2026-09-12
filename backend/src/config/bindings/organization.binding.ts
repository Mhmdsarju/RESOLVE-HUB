import { Container } from "inversify";
import { TYPES } from "../types";
import { IOrganizationRepository } from "@/modules/organization/domain/repositories/IOrganizationRepository";
// import { OrganizationController } from "@/modules/organization/presentation/controllers/OrganizationController";
// import { SuperAdminOrganizationController } from "@/modules/organization/presentation/controllers/SuperAdminOrganizationController";
import { IOrganizationVerificationRepository } from "@/modules/organization/domain/repositories/IOrganizationVerificationRepository";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { ApproveOrganizationVerificationUseCase } from "@/modules/organization/application/use-cases/ApproveOrganizationVerificationUseCase";
import { GetOrganizationProfileUseCase } from "@/modules/organization/application/use-cases/GetOrganizationProfileUseCase";
import { RejectOrganizationVerificationUseCase } from "@/modules/organization/application/use-cases/RejectOrganizationVerificationUseCase";
import { GetOrganizationVerificationUseCase } from "@/modules/organization/application/use-cases/GetOrganizationVerificationUseCase";
import { GetOrganizationVerificationDetailsUseCase } from "@/modules/organization/application/use-cases/GetOrganizationVerificationDetailsUseCase";
import { SubmitOrganizationVerificationUseCase } from "@/modules/organization/application/use-cases/SubmitOrganizationVerificationUseCase";
import { UpdateOrganizationUseCase } from "@/modules/organization/application/use-cases/UpdateOrganizationUseCase";
import { SuperAdminOrganizationController } from "@/modules/organization/presentation/controllers/SuperAdminOrganizationController";
import { OrganizationController } from "@/modules/organization/presentation/controllers/OrganizationController";
import { createOrganizationRoutes } from "@/modules/organization/presentation/routes/organization.routes";
import { createSuperAdminOrganizationRoutes } from "@/modules/organization/presentation/routes/superAdminOrganization.routes";
import { GetPendingOrganizationVerificationsUseCase } from "@/modules/organization/application/use-cases/GetPendingOrganizationVerificationsUseCase";
import { ICreateAuditLogUseCase } from "@/modules/audit-log/domain/interface/usecase/ICreateAuditLogUseCase";
import { KafkaManager } from "@/infrastructure/kafka/kafka.manager";
import { ICreateFreeSubscriptionUseCase } from "@/modules/subscription/domain/interface/use-cases/ICreateFreeSubscriptionUseCase";
import { GetOrganizationDashboardStatsUseCase } from "@/modules/organization/application/use-cases/GetOrganizationDashboardStatsUseCase";
import { GetOrganizationAnalyticsUseCase } from "@/modules/organization/application/use-cases/GetOrganizationAnalyticsUseCase";
import { GetSuperAdminOrganizationsUseCase } from "@/modules/organization/application/use-cases/GetSuperAdminOrganizationsUseCase";


export function bindOrganization(
    container: Container,
    createAuditLogUseCase: ICreateAuditLogUseCase,
    kafkaManager: KafkaManager,
    createFreeSubscriptionUseCase: ICreateFreeSubscriptionUseCase,
) {


    const organizationRepository = container.get<IOrganizationRepository>(TYPES.OrganizationRepository,);
    const organizationVerificationRepository = container.get<IOrganizationVerificationRepository>(TYPES.OrganizationVerificationRepository,);
    const userRepository = container.get<IUserRepository>(TYPES.UserRepository);

    const approveOrganizationVerificationUseCase = new ApproveOrganizationVerificationUseCase(
        organizationRepository,
        organizationVerificationRepository,
        userRepository,
        kafkaManager.producer,
        createFreeSubscriptionUseCase
    );


    const getOrganizationProfileUseCase = new GetOrganizationProfileUseCase(
        organizationRepository,
    );

    const getOrganizationVerificationDetailsUseCase = new GetOrganizationVerificationDetailsUseCase(
        organizationVerificationRepository,
    );

    const getOrganizationVerificationUseCase = new GetOrganizationVerificationUseCase(
        organizationVerificationRepository,
    );

    const getPendingOrganizationVerificationsUseCase = new GetPendingOrganizationVerificationsUseCase(
        organizationVerificationRepository,
    );

    const rejectOrganizationVerificationUseCase = new RejectOrganizationVerificationUseCase(
        organizationRepository,
        organizationVerificationRepository,
        userRepository,
        kafkaManager.producer
    );

    const submitOrganizationVerificationUseCase = new SubmitOrganizationVerificationUseCase(
        organizationRepository,
        organizationVerificationRepository,
        userRepository,
        kafkaManager.producer,
    );

    const updateOrganizationUseCase = new UpdateOrganizationUseCase(
        organizationRepository,
        createAuditLogUseCase
    );

    const getOrganizationDashboardStatsUseCase=new GetOrganizationDashboardStatsUseCase(
        organizationRepository
    )

    const organizationController = new OrganizationController(
        getOrganizationProfileUseCase,
        updateOrganizationUseCase,
        submitOrganizationVerificationUseCase,
        getOrganizationVerificationUseCase,
        getOrganizationDashboardStatsUseCase
    );

    const getOrganizationAnalyticsUseCase= new GetOrganizationAnalyticsUseCase(
        organizationRepository
    );

    const getSuperAdminOrganizationsUseCase=new GetSuperAdminOrganizationsUseCase(
        organizationRepository
    )

    const superAdminOrganizationController = new SuperAdminOrganizationController(
        approveOrganizationVerificationUseCase,
        rejectOrganizationVerificationUseCase,
        getPendingOrganizationVerificationsUseCase,
        getOrganizationVerificationDetailsUseCase,
        getOrganizationAnalyticsUseCase,
        getSuperAdminOrganizationsUseCase
    );

    const organizationRouter = createOrganizationRoutes(organizationController);
    const superAdminorganizationRouter = createSuperAdminOrganizationRoutes(superAdminOrganizationController);

    return {
        organizationRouter,
        superAdminorganizationRouter,
    }
}