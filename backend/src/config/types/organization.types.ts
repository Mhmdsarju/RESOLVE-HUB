export const ORGANIZATION_TYPES = {
    //repositories
    OrganizationRepository: Symbol.for("OrganizationRepository"),
    //controller
    OrganizationController: Symbol.for("OrganizationController"),
    //usecases
    GetOrganizationProfileUseCase: Symbol.for("GetOrganizationProfileUseCase"),
    UpdateOrganizationUseCase: Symbol.for("UpdateOrganizationUseCase"),
    OrganizationVerificationRepository:Symbol.for("OrganizationVerificationRepository"),
    SubmitOrganizationVerificationUseCase:Symbol.for("SubmitOrganizationVerificationUseCase"),
    ApproveOrganizationVerificationUseCase:Symbol.for("ApproveOrganizationVerificationUseCase"),
    RejectOrganizationVerificationUseCase:Symbol.for("RejectOrganizationVerificationUseCase"),
    SuperAdminOrganizationController:Symbol.for("SuperAdminOrganizationController"),
    GetPendingOrganizationVerificationsUseCase:Symbol.for("GetPendingOrganizationVerificationsUseCase"),
    GetOrganizationVerificationUseCase:Symbol.for("GetOrganizationVerificationUseCase"),
    GetOrganizationVerificationDetailsUseCase:Symbol.for("GetOrganizationVerificationDetailsUseCase"),
    OrganizationEmailService: Symbol.for("OrganizationEmailService"),
}