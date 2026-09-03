import { useQuery } from "@tanstack/react-query";

import { checkSubscriptionAccess } from "../api/subscription.api";

export function useSubscriptionAccess() {

    return useQuery({
        queryKey: ["subscription-access"],
        queryFn: checkSubscriptionAccess,
    });

}