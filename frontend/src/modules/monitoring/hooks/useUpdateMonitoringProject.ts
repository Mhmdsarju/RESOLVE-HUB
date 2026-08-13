import { AxiosError } from "axios";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateMonitoringProject } from "../api/monitoringProjectApi";

import type {
  MonitoringProject,
  UpdateMonitoringProjectDto,
} from "../types/monitoringProject.types";

import type { ErrorResponse } from "@/core/types/error.types";


interface UpdateMonitoringProjectVariables {
  id: string;
  data: UpdateMonitoringProjectDto;
}


export function useUpdateMonitoringProject() {
  const queryClient = useQueryClient();

  return useMutation<
    MonitoringProject,
    AxiosError<ErrorResponse>,
    UpdateMonitoringProjectVariables
  >({
    mutationFn: ({ id, data }) =>
      updateMonitoringProject(id, data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["monitoring-projects"],
      });

      queryClient.setQueryData<MonitoringProject>(
        ["monitoring-project", data.id],
        data,
      );

      toast.success(
        "Monitoring project updated successfully",
      );
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ??
        "Failed to update monitoring project";

      toast.error(message);
    },
  });
}