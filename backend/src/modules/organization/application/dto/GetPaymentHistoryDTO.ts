export interface GetPaymentHistoryDTO {
    page: number;
    limit: number;
    search?: string;
    status?: string;
}