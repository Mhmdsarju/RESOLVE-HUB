export interface IDeleteAlertRuleUseCase {
    execute(id: string, organizationId: string): Promise<void>;
}