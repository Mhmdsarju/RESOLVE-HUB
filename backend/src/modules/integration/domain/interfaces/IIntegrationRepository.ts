import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";
import { Integration } from "../entities/integration.entity";

export interface IIntegrationRepository extends IBaseRepository<Integration> {

    findByProjectAndName(monitoringProjectId: string, organizationId: string, name: string): Promise<Integration | null>;

    findAllByMonitoringProject(monitoringProjectId: string, organizationId: string, skip: number, take: number): Promise<{
        data: Integration[];
        total: number;
    }>;

}