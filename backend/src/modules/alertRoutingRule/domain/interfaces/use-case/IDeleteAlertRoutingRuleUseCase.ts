export interface IDeleteAlertRoutingRuleUseCase {
    execute(id: string): Promise<void>;
}