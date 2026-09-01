import { Payment as PrismaPayment, PaymentStatus as PrismaPaymentStatus } from "@prisma/client";

import { Payment } from "../../domain/entity/payment.entity";
import { PaymentStatus } from "../../domain/enums/paymentStatus.enum";

export class PaymentMapper {

    static fromDb(payment: PrismaPayment): Payment {
        return new Payment({
            id: payment.id,
            organizationId: payment.organizationId,
            subscriptionId: payment.subscriptionId,
            amount: payment.amount,
            currency: payment.currency,
            status: payment.status as PaymentStatus,
            transactionId: payment.transactionId,
            paidAt: payment.paidAt,
            createdAt: payment.createdAt,
        });
    }

    static toDb(payment: Payment) {
        return {
            organizationId: payment.organizationId,
            subscriptionId: payment.subscriptionId,
            amount: payment.amount,
            currency: payment.currency,
            status: payment.status as PrismaPaymentStatus,
            transactionId: payment.transactionId,
            paidAt: payment.paidAt,
        };
    }
}