import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateIncidentStatus } from "../api/incidentApi";

import type { Incident, UpdateIncidentStatusDto, } from "../types/incident.types";

import type { ErrorResponse } from "@/core/types/error.types";


interface UpdateIncidentStatusVariables {
    id: string;
    data: UpdateIncidentStatusDto;
}


export function useUpdateIncidentStatus() {
    const queryClient = useQueryClient();

    return useMutation<Incident, AxiosError<ErrorResponse>, UpdateIncidentStatusVariables>({
        mutationFn: ({ id, data }) => updateIncidentStatus(id, data),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["incidents"], });

            queryClient.setQueryData<Incident>(["incident", data.id], data,);

            queryClient.invalidateQueries({ queryKey: ["incident-stats"], });

            toast.success("Incident status updated successfully",);
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to update incident status";
            toast.error(message);
        },
    });
}