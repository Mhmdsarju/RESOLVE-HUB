import { SuperAdminDashboardDTO } from "../../application/dto/SuperAdminDashboardDTO"; 

export interface IGetSuperAdminDashboardUseCase {
    execute(): Promise<SuperAdminDashboardDTO>;
}