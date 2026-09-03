export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface Payment {
    id: string;
    organizationId: string;
    subscriptionId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    transactionId: string | null;
    razorpayOrderId: string;
    paidAt: string | null;
    createdAt: string;

}