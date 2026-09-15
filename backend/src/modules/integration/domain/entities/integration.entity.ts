import { IntegrationType } from "../enums/integrationType.enum";

export class Integration {
  constructor(
    public id: string,
    public monitoringProjectId: string,
    public organizationId: string,
    public name: string,
    public type: IntegrationType,
    public config: Record<string, unknown>,
    public isActive: boolean,
    public createdAt: Date
  ) {}
}