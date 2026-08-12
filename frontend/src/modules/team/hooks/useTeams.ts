import { useQuery } from "@tanstack/react-query";

import { getTeams } from "../api/teamApi";
import type { GetTeamsParams } from "../types/team.types";

export function useTeams(params?: GetTeamsParams) {
    return useQuery({
        queryKey: ["teams", params],
        queryFn: () => getTeams(params)
    })
}