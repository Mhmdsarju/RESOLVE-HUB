import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";
import { Payment } from "../entity/payment.entity";
import { PaymentStatus } from "../enums/paymentStatus.enum";

export interface IPaymentRepository extends IBaseRepository<Payment> {
    findByTransactionId(transactionId: string): Promise<Payment | null>;

    findByOrganizationId(organizationId: string): Promise<Payment[]>;

    findBySubscriptionId(subscriptionId: string): Promise<Payment[]>;

    findByOrganizationIdAndStatus(
        organizationId: string,
        status: PaymentStatus,
    ): Promise<Payment[]>;
}