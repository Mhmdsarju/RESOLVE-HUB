import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTask } from "../api/taskApi";

export function useDeleteTask(  incidentId: string,) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", incidentId],
      });
    },
  });
}