import { IExportPaymentReportUseCase } from "../../domain/interfaces/IExportPaymentReportUseCase";
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { IPdfService } from "../../../../shared/services/interface/IPdfService";

export class ExportPaymentReportUseCase implements IExportPaymentReportUseCase {
    constructor(
        private readonly organizationRepository: IOrganizationRepository,
        private readonly pdfService: IPdfService,
    ) { }

    async execute(): Promise<PDFKit.PDFDocument> {
        const paymentHistory = await this.organizationRepository.getPaymentHistory(
            1,
            100000,
        );

        const totalPayments = paymentHistory.payments.length;

        const successfulPayments = paymentHistory.payments.filter(
            (payment) => payment.status === "SUCCESS",
        ).length;

        const pendingPayments = paymentHistory.payments.filter(
            (payment) => payment.status === "PENDING",
        ).length;

        const failedPayments = paymentHistory.payments.filter(
            (payment) => payment.status === "FAILED",
        ).length;

        const totalRevenue = paymentHistory.payments
            .filter((payment) => payment.status === "SUCCESS")
            .reduce((total, payment) => total + payment.amount, 0);

        return this.pdfService.generatePaymentReport({
            totalPayments,
            successfulPayments,
            pendingPayments,
            failedPayments,
            totalRevenue,
            payments: paymentHistory.payments,
        });
    }
}