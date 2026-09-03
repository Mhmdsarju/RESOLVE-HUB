import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

import { createPayment } from "../api/payment.api";

export function useCreatePayment() {
    return useMutation({
        mutationFn: ({
            subscriptionId,
            planId,
            amount,
            currency,
        }: {
            subscriptionId: string;
            planId: string;
            amount: number;
            currency: string;
        }) =>
            createPayment(
                subscriptionId,
                planId,
                amount,
                currency,
            ),

        onSuccess: () => {
            toast.success(
                "Payment created successfully",
            );
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ??
                    "Failed to create payment",
                );

                return;
            }

            toast.error(
                "Failed to create payment",
            );
        },
    });
}