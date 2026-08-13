import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createIncident } from "../api/incidentApi";

import type { CreateIncidentDto, Incident, } from "../types/incident.types";
import type { ErrorResponse } from "@/core/types/error.types";

export function useCreateIncident() {
    const queryClient = useQueryClient();

    return useMutation<Incident, AxiosError<ErrorResponse>, CreateIncidentDto>({
        mutationFn: createIncident,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["incidents"],
            });

            queryClient.invalidateQueries({
                queryKey: ["incident-stats"],
            });

            toast.success("Incident created successfully");
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to create incident";
            toast.error(message);
        },
    });
}