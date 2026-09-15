import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

import { processPayment } from "../api/payment.api";

export function useProcessPayment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        }: {
            id: string;
            razorpayPaymentId: string;
            razorpayOrderId: string;
            razorpaySignature: string;
        }) =>
            processPayment(
                id,
                razorpayPaymentId,
                razorpayOrderId,
                razorpaySignature,
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["subscription"],
            });

            queryClient.invalidateQueries({
                queryKey: ["subscription-access"],
            });

            queryClient.invalidateQueries({
                queryKey: ["payments"],
            });
            queryClient.invalidateQueries({ queryKey: ["organization"] });

            toast.success("Payment processed successfully",);
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Failed to process payment",);

                return;
            }

            toast.error("Failed to process payment",);
        },
    });
}