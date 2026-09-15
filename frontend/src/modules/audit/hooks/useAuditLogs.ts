import { useQuery } from "@tanstack/react-query";

import {
    getAuditLogs,
} from "../api/auditLogApi";

import type { GetAuditLogsParams, GetAuditLogsResponse, } from "../types/auditLog.types";


export function useAuditLogs(params: GetAuditLogsParams = {},) {

    return useQuery<GetAuditLogsResponse>({
        queryKey: [
            "audit-logs",
            params.page ?? 1,
            params.limit ?? 10,
            params.search ?? "",
            params.action,
            params.entityType,
        ],

        queryFn: () => getAuditLogs(params),

        refetchOnWindowFocus: true,

        refetchOnReconnect: true,

        refetchInterval: 3000,

        refetchIntervalInBackground: false,
    });

}