import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteMonitoringProject } from "../api/monitoringProjectApi";

import type { ErrorResponse } from "@/core/types/error.types";


export function useDeleteMonitoringProject() {
  const queryClient = useQueryClient();

  return useMutation<null, AxiosError<ErrorResponse>, string>({
    mutationFn: deleteMonitoringProject,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["monitoring-projects"],
      });

      queryClient.removeQueries({
        queryKey: ["monitoring-project", id],
      });

      toast.success("Monitoring project deleted successfully",);
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to delete monitoring project";
      toast.error(message);
    },
  });
}