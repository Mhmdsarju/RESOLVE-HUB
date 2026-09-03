import { ISubscriptionRepository } from "../../domain/interface/ISubscriptionRepository";
import { IProcessSubscriptionExpiryUseCase } from "../../domain/interface/use-cases/IProcessSubscriptionExpiryUseCase";
import { SubscriptionStatus } from "../../domain/enums/subscriptionStatus.enum";
import { IOrganizationRepository } from "@/modules/organization/domain/repositories/IOrganizationRepository"; 
import { OrganizationAccessStatus } from "@/modules/organization/domain/enums/organizationAccessStatus.enum";

export class ProcessSubscriptionExpiryUseCase implements IProcessSubscriptionExpiryUseCase {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly organizationRepository: IOrganizationRepository,
    ) { }

    async execute(): Promise<void> {

        const subscriptions =
            await this.subscriptionRepository.findExpiredSubscriptions(new Date());

        for (const subscription of subscriptions) {
            await this.subscriptionRepository.update(
                subscription.id!,
                {
                    status: SubscriptionStatus.EXPIRED,
                },
            );

            await this.organizationRepository.update(
                subscription.organizationId,
                {
                    accessStatus: OrganizationAccessStatus.FROZEN,
                },
            );
        }
    }
}