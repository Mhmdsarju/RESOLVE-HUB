export interface ICheckSubscriptionAccessUseCase {
    execute(organizationId: string): Promise<{
        hasAccess: boolean;
        isPremium: boolean;
        maxProjects: number | null;
    }>;
}