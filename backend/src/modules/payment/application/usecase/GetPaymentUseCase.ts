import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Payment } from "../../domain/entity/payment.entity";
import { IPaymentRepository } from "../../domain/interface/IPaymentRepository";
import { IGetPaymentUseCase } from "../../domain/interface/use-cases/IGetPaymentUseCase";

export class GetPaymentUseCase implements IGetPaymentUseCase {

    constructor(
        private readonly paymentRepository: IPaymentRepository,
    ) { }

    async execute(paymentId: string, organizationId: string): Promise<Payment> {
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

        return payment;
    }
}