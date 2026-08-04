import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateOrganization } from "../api/organizationApi";

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrganization,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization"],
      });

      toast.success("Organization updated successfully");
    },

    onError: () => {
      toast.error("Failed to update organization");
    },
  });
}