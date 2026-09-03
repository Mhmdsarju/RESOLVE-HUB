import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type { Payment } from "../types/payment.types";

export async function createPayment(
    subscriptionId: string,
    planId: string,
    amount: number,
    currency: string,
): Promise<Payment> {
    const response = await api.post(ENDPOINTS.PAYMENT.BASE, {
        subscriptionId,
        planId,
        amount,
        currency,
    });

    return response.data.data;
}

export async function getPayments(): Promise<Payment[]> {
    const response = await api.get(ENDPOINTS.PAYMENT.BASE);

    return response.data.data;
}

export async function getPaymentById(id: string,): Promise<Payment> {
    const response = await api.get(ENDPOINTS.PAYMENT.BY_ID(id));

    return response.data.data;
}

export async function processPayment(
    id: string,
    razorpayPaymentId: string,
    razorpayOrderId: string,
    razorpaySignature: string,
): Promise<Payment> {
    const response = await api.post(
        ENDPOINTS.PAYMENT.PROCESS(id),
        {
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        },
    );

    return response.data.data;
}