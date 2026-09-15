import { Payment } from "../../domain/entity/payment.entity";
import { IPaymentRepository } from "../../domain/interface/IPaymentRepository";
import { IGetPaymentsUseCase } from "../../domain/interface/use-cases/IGetPaymentsUseCase";

export class GetPaymentsUseCase implements IGetPaymentsUseCase {

    constructor(
        private readonly paymentRepository: IPaymentRepository,
    ) { }

    async execute(organizationId: string): Promise<Payment[]> {
        return await this.paymentRepository.findByOrganizationId(organizationId);
    }
}