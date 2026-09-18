export interface GetPaymentHistoryDTO {
    page: number;
    limit: number;
    search?: string;
    status?: string;

    period?: "MONTHLY" | "YEARLY" | "CUSTOM";
    year?: number;
    month?: number;
    startDate?: Date;
    endDate?: Date;
}