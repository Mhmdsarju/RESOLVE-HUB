import Razorpay from "razorpay";
import type { Orders } from "razorpay/dist/types/orders";
import { IRazorpayService } from "../../domain/interface/IRazorpayService";
import crypto from "crypto";


export class RazorpayService implements IRazorpayService {
    private readonly razorpay: Razorpay;

    constructor() {
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });
    }

    async createOrder(amount: number, currency: string, receipt: string,): Promise<Orders.RazorpayOrder> {
        return await this.razorpay.orders.create({
            amount,
            currency,
            receipt,
        });
    }

    verifyPaymentSignature(
        orderId: string,
        paymentId: string,
        signature: string,
    ): boolean {
        const body = `${orderId}|${paymentId}`;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body)
            .digest("hex");

        return expectedSignature === signature;
    }
}