import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type { GetAuditLogsParams, GetAuditLogsResponse, } from "../types/auditLog.types";


export async function getAuditLogs(params: GetAuditLogsParams = {},): Promise<GetAuditLogsResponse> {
    const response = await api.get(
        ENDPOINTS.AUDIT_LOG.BASE,
        {
            params,
        },
    );

    return response.data.data;
}