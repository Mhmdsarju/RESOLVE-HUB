export interface IDeleteIntegrationUseCase {
    execute(id: string, organizationId: string): Promise<void>;
}