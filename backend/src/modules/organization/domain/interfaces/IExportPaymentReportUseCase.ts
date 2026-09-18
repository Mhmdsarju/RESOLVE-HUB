import { GetPaymentHistoryDTO } from "../../application/dto/GetPaymentHistoryDTO";

export interface IExportPaymentReportUseCase {
    execute(
        filters?: Omit<GetPaymentHistoryDTO, "page" | "limit">,
    ): Promise<PDFKit.PDFDocument>;
}