import { GetPaymentHistoryDTO } from "../../application/dto/GetPaymentHistoryDTO";
import { PaymentHistoryDTO } from "../../application/dto/PaymentHistoryDTO";

export interface IGetPaymentHistoryUseCase {
    execute(dto: GetPaymentHistoryDTO): Promise<PaymentHistoryDTO>;
}