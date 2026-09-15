import { AxiosError } from "axios";
import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { assignIncidentTeam } from "../api/incidentApi";

import type {
    Incident,
    AssignIncidentTeamDto,
} from "../types/incident.types";

import type { ErrorResponse } from "@/core/types/error.types";


interface AssignIncidentTeamVariables {
    id: string;
    data: AssignIncidentTeamDto;
}


export function useAssignIncidentTeam() {
    const queryClient = useQueryClient();

    return useMutation<Incident, AxiosError<ErrorResponse>, AssignIncidentTeamVariables>({
        mutationFn: ({ id, data }) => assignIncidentTeam(id, data),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["incidents"], });

            queryClient.setQueryData<Incident>(["incident", data.id], data,);

            toast.success("Incident team assigned successfully",);
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to assign incident team";
            toast.error(message);
        },
    });
}