export interface PaymentHistoryDTO {
    payments: {
        id: string;
        organizationName: string;
        plan: string;
        amount: number;
        currency: string;
        status: string;
        transactionId: string | null;
        razorpayOrderId: string;
        paidAt: Date | null;
        createdAt: Date;
    }[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}