export interface PaymentReportPaymentDTO {
    organizationName: string;
    plan: string;
    amount: number;
    currency: string;
    status: string;
    transactionId: string | null;
    razorpayOrderId: string;
    paidAt: Date | null;
    createdAt: Date;
}