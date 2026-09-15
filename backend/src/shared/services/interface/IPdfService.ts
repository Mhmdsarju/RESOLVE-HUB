import { PaymentReportDTO } from "../../../modules/organization/application/dto/PaymentReportDTO";


export interface IPdfService {
    generatePaymentReport(data: PaymentReportDTO): PDFKit.PDFDocument;
}