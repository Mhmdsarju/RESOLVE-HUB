import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { Payment } from "../../domain/entity/payment.entity";
import { IPaymentRepository } from "../../domain/interface/IPaymentRepository";
import { PaymentStatus } from "../../domain/enums/paymentStatus.enum";
import { PaymentMapper } from "../mappers/PaymentMapper";

@injectable()
export class PrismaPaymentRepository implements IPaymentRepository {

    async create(payment: Payment): Promise<Payment> {
        const created = await prisma.payment.create({
            data: PaymentMapper.toDb(payment),
        });

        return PaymentMapper.fromDb(created);
    }

    async findById(id: string): Promise<Payment | null> {
        const payment = await prisma.payment.findUnique({
            where: { id },
        });

        if (!payment) {
            return null;
        }

        return PaymentMapper.fromDb(payment);
    }

    async findAll(): Promise<Payment[]> {
        const payments = await prisma.payment.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return payments.map(PaymentMapper.fromDb);
    }

    async update(id: string, data: Partial<Payment>): Promise<Payment> {
        const updated = await prisma.payment.update({
            where: { id },
            data: PaymentMapper.toDb({
                ...(data as Payment),
            }),
        });

        return PaymentMapper.fromDb(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.payment.delete({
            where: { id },
        });
    }

    async findByTransactionId(transactionId: string): Promise<Payment | null> {
        const payment = await prisma.payment.findUnique({
            where: {
                transactionId,
            },
        });

        if (!payment) {
            return null;
        }

        return PaymentMapper.fromDb(payment);
    }

    async findByOrganizationId(organizationId: string): Promise<Payment[]> {
        const payments = await prisma.payment.findMany({
            where: {
                organizationId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return payments.map(PaymentMapper.fromDb);
    }

    async findBySubscriptionId(subscriptionId: string): Promise<Payment[]> {
        const payments = await prisma.payment.findMany({
            where: {
                subscriptionId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return payments.map(PaymentMapper.fromDb);
    }

    async findByOrganizationIdAndStatus(
        organizationId: string,
        status: PaymentStatus,
    ): Promise<Payment[]> {
        const payments = await prisma.payment.findMany({
            where: {
                organizationId,
                status,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return payments.map(PaymentMapper.fromDb);
    }
}