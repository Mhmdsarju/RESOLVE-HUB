import { Container } from "inversify";
import { TYPES } from "../types";
import { IOrganizationRepository } from "@/modules/organization/domain/repositories/IOrganizationRepository";
// import { OrganizationController } from "@/modules/organization/presentation/controllers/OrganizationController";
// import { SuperAdminOrganizationController } from "@/modules/organization/presentation/controllers/SuperAdminOrganizationController";
import { IOrganizationVerificationRepository } from "@/modules/organization/domain/repositories/IOrganizationVerificationRepository";
import { IOrganizationEmailService } from "@/modules/organization/domain/interfaces/IOrganizationEmailService";
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


export function bindOrganization(container: Container) {


    const organizationRepository = container.get<IOrganizationRepository>(TYPES.OrganizationRepository,);
    const organizationVerificationRepository = container.get<IOrganizationVerificationRepository>(TYPES.OrganizationVerificationRepository,);
    const organizationEmailService = container.get<IOrganizationEmailService>(TYPES.OrganizationEmailService,);
    const userRepository = container.get<IUserRepository>(TYPES.UserRepository);

    const approveOrganizationVerificationUseCase = new ApproveOrganizationVerificationUseCase(
        organizationRepository,
        organizationVerificationRepository,
        userRepository,
        organizationEmailService,
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
        organizationEmailService,
    );

    const submitOrganizationVerificationUseCase = new SubmitOrganizationVerificationUseCase(
        organizationRepository,
        organizationVerificationRepository,
        userRepository,
        organizationEmailService,
    );

    const updateOrganizationUseCase = new UpdateOrganizationUseCase(
        organizationRepository,
    );

    const organizationController = new OrganizationController(
        getOrganizationProfileUseCase,
        updateOrganizationUseCase,
        submitOrganizationVerificationUseCase,
        getOrganizationVerificationUseCase,
    );

    const superAdminOrganizationController = new SuperAdminOrganizationController(
        approveOrganizationVerificationUseCase,
        rejectOrganizationVerificationUseCase,
        getPendingOrganizationVerificationsUseCase,
        getOrganizationVerificationDetailsUseCase,
    );

    const organizationRouter = createOrganizationRoutes(organizationController);
    const superAdminorganizationRouter = createSuperAdminOrganizationRoutes(superAdminOrganizationController);

    return {
        organizationRouter,
        superAdminorganizationRouter,
    }
}