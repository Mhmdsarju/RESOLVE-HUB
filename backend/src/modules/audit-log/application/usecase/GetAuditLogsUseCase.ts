import { IGetAuditLogsUseCase } from "../../domain/interface/usecase/IGetAuditLogsUseCase";
import { IAuditLogRepository } from "../../domain/interface/IAuditLogRepository";

import { GetAuditLogsDto } from "../dto/GetAuditLogsDto";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class GetAuditLogsUseCase implements IGetAuditLogsUseCase {
    constructor(
        private readonly auditLogRepository: IAuditLogRepository,
    ) { }

    async execute(dto: GetAuditLogsDto) {

        if (!dto.organizationId?.trim()) {
            throw new AppError(
                "Organization ID is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (dto.page < 1) {
            throw new AppError(
                "Page must be greater than 0",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (dto.limit < 1) {
            throw new AppError(
                "Limit must be greater than 0",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const result = await this.auditLogRepository.findByOrganizationId(
            dto,
        );

        return {
            data: result.data,
            total: result.total,
            page: dto.page,
            limit: dto.limit,
            totalPages: Math.ceil(result.total / dto.limit),
        };
    }
}