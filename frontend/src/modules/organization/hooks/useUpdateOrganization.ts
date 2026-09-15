import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateOrganization } from "../api/organizationApi";
import axios from "axios";

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

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Failed to update organization",);
        return;
      }

      toast.error("Failed to update organization");
    },

  });
}