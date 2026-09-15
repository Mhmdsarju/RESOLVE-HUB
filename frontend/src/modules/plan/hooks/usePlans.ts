import { useQuery } from "@tanstack/react-query";

import { getPlans } from "../api/plan.api";

export function usePlans() {
    return useQuery({
        queryKey: ["plans"],
        queryFn: getPlans,
    });
}