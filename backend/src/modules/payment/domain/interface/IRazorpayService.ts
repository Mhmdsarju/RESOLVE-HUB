import type { Orders } from "razorpay/dist/types/orders";

export interface IRazorpayService {
    createOrder(
        amount: number,
        currency: string,
        receipt: string,
    ): Promise<Orders.RazorpayOrder>;

    verifyPaymentSignature(
        orderId: string,
        paymentId: string,
        signature: string,
    ): boolean;
}