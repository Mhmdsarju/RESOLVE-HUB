import { Payment } from "../../entity/payment.entity";

export interface IGetPaymentUseCase {
    execute(paymentId: string, organizationId: string,): Promise<Payment>;
}