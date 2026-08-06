export const ORGANIZATION_TYPES = {
    //repositories
    OrganizationRepository: Symbol.for("OrganizationRepository"),
    //controller
    OrganizationController: Symbol.for("OrganizationController"),
    //usecases
    GetOrganizationProfileUseCase: Symbol.for("GetOrganizationProfileUseCase"),
    UpdateOrganizationUseCase: Symbol.for("UpdateOrganizationUseCase"),
}