export interface IGetIncidentStatsUseCase {
  execute(organizationId: string): Promise<{
    total: number;
    status: Record<string, number>;
    severity: Record<string, number>;
    priority: Record<string, number>;
  }>;
}