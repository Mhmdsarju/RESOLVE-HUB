import { Payment } from "../../entity/payment.entity";

export interface IProcessPaymentUseCase {
    execute(paymentId: string, organizationId: string,): Promise<Payment>;
}