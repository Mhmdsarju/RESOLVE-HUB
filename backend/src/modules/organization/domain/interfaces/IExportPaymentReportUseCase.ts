export interface IExportPaymentReportUseCase {
    execute(): Promise<PDFKit.PDFDocument>;
}