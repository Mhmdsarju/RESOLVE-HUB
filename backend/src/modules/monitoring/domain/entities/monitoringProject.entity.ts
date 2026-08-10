export class MonitoringProject {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string | null,
    public organizationId: string,
    public createdBy: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}