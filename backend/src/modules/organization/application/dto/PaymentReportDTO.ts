import { PaymentReportPaymentDTO } from "./PaymentReportPaymentDTO";

export interface PaymentReportDTO {
    totalPayments: number;
    successfulPayments: number;
    pendingPayments: number;
    failedPayments: number;
    totalRevenue: number;
    payments: PaymentReportPaymentDTO[];
}