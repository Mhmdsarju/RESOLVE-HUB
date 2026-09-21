import { GetPaymentHistoryDTO } from "../dto/GetPaymentHistoryDTO";
import { PaymentHistoryDTO } from "../dto/PaymentHistoryDTO";
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";

export class GetOrgAdminPaymentHistoryUseCase {
    constructor(
        private readonly organizationRepository: IOrganizationRepository,
    ) {}

    async execute(
        organizationId: string,
        dto: GetPaymentHistoryDTO,
    ): Promise<PaymentHistoryDTO> {
        return await this.organizationRepository.getOrgAdminPaymentHistory(
            organizationId,
            dto.page,
            dto.limit,
            dto.search,
            dto.status,
            dto.period,
            dto.year,
            dto.month,
            dto.startDate,
            dto.endDate,
        );
    }
}