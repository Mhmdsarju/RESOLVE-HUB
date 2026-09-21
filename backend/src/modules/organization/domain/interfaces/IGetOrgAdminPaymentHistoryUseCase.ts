import { GetPaymentHistoryDTO } from "../../application/dto/GetPaymentHistoryDTO";
import { PaymentHistoryDTO } from "../../application/dto/PaymentHistoryDTO";

export interface IGetOrgAdminPaymentHistoryUseCase {
  execute(
    organizationId: string,
    dto: GetPaymentHistoryDTO,
  ): Promise<PaymentHistoryDTO>;
}