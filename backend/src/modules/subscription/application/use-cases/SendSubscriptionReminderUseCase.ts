import { ISubscriptionRepository } from "../../domain/interface/ISubscriptionRepository";
import { ISendSubscriptionReminderUseCase } from "../../domain/interface/use-cases/ISendSubscriptionReminderUseCase";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { IOrganizationRepository } from "@/modules/organization/domain/repositories/IOrganizationRepository";
import { IEventPublisher } from "@/modules/organization/domain/interfaces/IEventPublisher"; 
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { KafkaTopics } from "@/shared/constant/kafka.topics";

export class SendSubscriptionReminderUseCase implements ISendSubscriptionReminderUseCase {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly userRepository: IUserRepository,
        private readonly organizationRepository: IOrganizationRepository,
        private readonly eventPublisher: IEventPublisher,
    ) { }

    async execute(): Promise<void> {

        const now = new Date();

        const tenDaysFromNow = new Date(now);
        tenDaysFromNow.setDate(tenDaysFromNow.getDate() + 10);

        const subscriptions = await this.subscriptionRepository.findExpiringSubscriptions(now, tenDaysFromNow);

        for (const subscription of subscriptions) {

            if (!subscription.endDate) {
                throw new AppError(
                    "Subscription end date not found",
                    HttpStatusCode.BAD_REQUEST,
                );
            }

            const admin = await this.userRepository.findOrganizationAdminByOrganizationId(
                subscription.organizationId,
            );

            if (!admin) {
                throw new AppError(
                    "Organization admin not found",
                    HttpStatusCode.NOT_FOUND,
                );
            }

            const organization = await this.organizationRepository.findById(
                subscription.organizationId,
            );

            if (!organization) {
                throw new AppError(
                    "Organization not found",
                    HttpStatusCode.NOT_FOUND,
                );
            }

            const daysRemaining = Math.ceil(
                (subscription.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
            );

            if (
                daysRemaining <= 10 &&
                daysRemaining > 2 &&
                !subscription.reminder10DaysSentAt
            ) {
                await this.eventPublisher.publish(
                    KafkaTopics.EMAIL_EVENTS,
                    {
                        event: "SUBSCRIPTION_EXPIRING_10_DAYS",
                        email: admin.email,
                        organizationName: organization.name,
                        organizationId: subscription.organizationId,
                        endDate: subscription.endDate,
                    },
                );

                await this.subscriptionRepository.updateReminder10DaysSentAt(
                    subscription.id!,
                    now,
                );
            }

            if (
                daysRemaining <= 2 &&
                daysRemaining > 0 &&
                !subscription.reminder2DaysSentAt
            ) {
                await this.eventPublisher.publish(
                    KafkaTopics.EMAIL_EVENTS,
                    {
                        event: "SUBSCRIPTION_EXPIRING_2_DAYS",
                        email: admin.email,
                        organizationName: organization.name,
                        organizationId: subscription.organizationId,
                        endDate: subscription.endDate,
                    },
                );

                await this.subscriptionRepository.updateReminder2DaysSentAt(
                    subscription.id!,
                    now,
                );
            }
        }
    }
}