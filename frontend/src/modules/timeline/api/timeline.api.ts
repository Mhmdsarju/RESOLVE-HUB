import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type { TimelineEvent } from "../types/timeline.types";


export async function getIncidentTimeline(    incidentId: string,): Promise<TimelineEvent[]> {
    const response = await api.get(
        ENDPOINTS.TIMELINE.BY_INCIDENT(incidentId),
    );

    return response.data.data;
}