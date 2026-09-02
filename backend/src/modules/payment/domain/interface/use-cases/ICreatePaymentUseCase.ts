import { Payment } from "../../entity/payment.entity";

export interface ICreatePaymentUseCase {
    execute(organizationId: string, subscriptionId: string, amount: number,): Promise<Payment>;
}