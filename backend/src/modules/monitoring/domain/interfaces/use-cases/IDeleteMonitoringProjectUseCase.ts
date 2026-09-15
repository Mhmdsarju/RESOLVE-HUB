export interface IDeleteMonitoringProjectUseCase {
  execute(id: string, organizationId: string): Promise<void>;
}