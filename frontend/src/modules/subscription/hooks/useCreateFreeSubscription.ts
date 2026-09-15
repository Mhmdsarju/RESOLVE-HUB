import { useMutation } from "@tanstack/react-query";

import { createFreeSubscription } from "../api/subscription.api";

export function useCreateFreeSubscription() {

    return useMutation({
        mutationFn: createFreeSubscription,
    });

}