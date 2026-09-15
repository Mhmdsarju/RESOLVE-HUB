import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

import { upgradeSubscription } from "../api/subscription.api";

export function useUpgradeSubscription() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: upgradeSubscription,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["subscription"],
            });

            queryClient.invalidateQueries({
                queryKey: ["subscription-access"],
            });

            toast.success(
                "Subscription upgraded successfully",
            );
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Failed to upgrade subscription",);

                return;
            }

            toast.error("Failed to upgrade subscription",);
        },
    });
}