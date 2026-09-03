import { Payment } from "../../entity/payment.entity";

export interface IProcessPaymentUseCase {
    execute(
        paymentId: string,
        organizationId: string,
        razorpayPaymentId: string,
        razorpayOrderId: string,
        razorpaySignature: string,
    ): Promise<Payment>;
}