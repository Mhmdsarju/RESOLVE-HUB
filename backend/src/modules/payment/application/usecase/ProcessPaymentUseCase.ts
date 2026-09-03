import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Payment } from "../../domain/entity/payment.entity";
import { PaymentStatus } from "../../domain/enums/paymentStatus.enum";
import { IPaymentRepository } from "../../domain/interface/IPaymentRepository";
import { ISubscriptionRepository } from "@/modules/subscription/domain/interface/ISubscriptionRepository";
import { IPlanRepository } from "@/modules/plan/domain/interface/IPlanRepository";
import { IProcessPaymentUseCase } from "../../domain/interface/use-cases/IProcessPaymentUseCase";
import { SubscriptionStatus } from "@/modules/subscription/domain/enums/subscriptionStatus.enum";
import { IRazorpayService } from "../../domain/interface/IRazorpayService";
import { IOrganizationRepository } from "@/modules/organization/domain/repositories/IOrganizationRepository";
import { OrganizationAccessStatus } from "@/modules/organization/domain/enums/organizationAccessStatus.enum";

export class ProcessPaymentUseCase implements IProcessPaymentUseCase {

    constructor(
        private readonly paymentRepository: IPaymentRepository,
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly planRepository: IPlanRepository,
        private readonly razorpayService: IRazorpayService,
        private readonly organizationRepository: IOrganizationRepository,
    ) { }

    async execute(
        paymentId: string,
        organizationId: string,
        razorpayPaymentId: string,
        razorpayOrderId: string,
        razorpaySignature: string,
    ): Promise<Payment> {
        const payment = await this.paymentRepository.findById(paymentId);

        if (!payment) {
            throw new AppError(
                "Payment not found",
                HttpStatusCode.NOT_FOUND,
            );
        }

        if (payment.organizationId !== organizationId) {
            throw new AppError(
                "Payment does not belong to this organization",
                HttpStatusCode.FORBIDDEN,
            );
        }

        if (payment.status !== PaymentStatus.PENDING) {
            throw new AppError(
                "Payment has already been processed",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (payment.razorpayOrderId !== razorpayOrderId) {
            throw new AppError(
                "Razorpay order does not match the payment",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const isValidSignature = this.razorpayService.verifyPaymentSignature(
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
        );

        if (!isValidSignature) {
            throw new AppError(
                "Invalid Razorpay payment signature",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const subscription = await this.subscriptionRepository.findById(
            payment.subscriptionId,
        );

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

        const plan = await this.planRepository.findById(
            payment.planId,
        );

        if (!plan) {
            throw new AppError(
                "Plan not found",
                HttpStatusCode.NOT_FOUND,
            );
        }

        const now = new Date();

        const endDate = new Date(now);
        endDate.setDate(
            endDate.getDate() + (plan.durationDays ?? 365),
        );

        await this.subscriptionRepository.update(
            subscription.id!,
            {
                planId: plan.id!,
                status: SubscriptionStatus.ACTIVE,
                startDate: now,
                endDate,
                reminder10DaysSentAt: null,
                reminder2DaysSentAt: null,
            },
        );
        await this.organizationRepository.update(
            organizationId,
            {
                accessStatus:OrganizationAccessStatus.ACTIVE
            }
        )

        return await this.paymentRepository.update(
            payment.id!,
            {
                status: PaymentStatus.SUCCESS,
                transactionId: razorpayPaymentId,
                paidAt: now,
            },
        );
    }
}