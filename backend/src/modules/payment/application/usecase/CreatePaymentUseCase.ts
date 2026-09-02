import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Payment } from "../../domain/entity/payment.entity";
import { PaymentStatus } from "../../domain/enums/paymentStatus.enum";
import { IPaymentRepository } from "../../domain/interface/IPaymentRepository";
import { ISubscriptionRepository } from "@/modules/subscription/domain/interface/ISubscriptionRepository";
import { IPlanRepository } from "@/modules/plan/domain/interface/IPlanRepository";
import { ICreatePaymentUseCase } from "../../domain/interface/use-cases/ICreatePaymentUseCase";

export class CreatePaymentUseCase implements ICreatePaymentUseCase {

    constructor(
        private readonly paymentRepository: IPaymentRepository,
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly planRepository: IPlanRepository,
    ) { }

    async execute(organizationId: string, subscriptionId: string, amount: number,): Promise<Payment> {
        const subscription = await this.subscriptionRepository.findById(subscriptionId);

        if (!subscription) {
            throw new AppError(
                "Subscription not found",
                HttpStatusCode.NOT_FOUND,
            );
        }

        if (subscription.organizationId !== organizationId) {
            throw new AppError(
                "Subscription does not belong to this organization",
                HttpStatusCode.FORBIDDEN,
            );
        }

        const plan = await this.planRepository.findById(subscription.planId);

        if (!plan) {
            throw new AppError(
                "Plan not found",
                HttpStatusCode.NOT_FOUND,
            );
        }

        if (!plan.isActive) {
            throw new AppError(
                "Plan is not active",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (plan.name === "FREE") {
            throw new AppError(
                "Payment is not required for free plan",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (amount <= 0) {
            throw new AppError(
                "Payment amount must be greater than zero",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (amount !== plan.price) {
            throw new AppError(
                "Payment amount does not match the plan price",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

        const payment = new Payment({
            organizationId,
            subscriptionId,
            amount,
            currency: "INR",
            status: PaymentStatus.PENDING,
            transactionId,
        });

        return await this.paymentRepository.create(payment);
    }
}