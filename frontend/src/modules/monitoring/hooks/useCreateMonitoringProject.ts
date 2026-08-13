import { AxiosError } from "axios";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createMonitoringProject } from "../api/monitoringProjectApi";

import type {
  CreateMonitoringProjectDto,
  MonitoringProject,
} from "../types/monitoringProject.types";

import type { ErrorResponse } from "@/core/types/error.types";


export function useCreateMonitoringProject() {
  const queryClient = useQueryClient();

  return useMutation<
    MonitoringProject,
    AxiosError<ErrorResponse>,
    CreateMonitoringProjectDto
  >({
    mutationFn: createMonitoringProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["monitoring-projects"],
      });

      toast.success(
        "Monitoring project created successfully",
      );
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ??
        "Failed to create monitoring project";

      toast.error(message);
    },
  });
}