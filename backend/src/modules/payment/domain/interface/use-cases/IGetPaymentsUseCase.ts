import { Payment } from "../../entity/payment.entity";

export interface IGetPaymentsUseCase {
    execute(organizationId: string,): Promise<Payment[]>;
}