import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";
import { MonitoringProject } from "@/modules/monitoring/domain/entities/monitoringProject.entity";

export interface IMonitoringProjectRepository extends IBaseRepository<MonitoringProject> {

    findByName(name: string, organizationId: string): Promise<MonitoringProject | null>;

    findAllByOrganization(organizationId: string): Promise<MonitoringProject[]>;

    findAllByOrganizationPaginated(organizationId: string, skip: number, take: number): Promise<{
        data: MonitoringProject[];
        total: number;
    }>;

}