import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

import { submitOrganizationVerification } from "../api/organizationApi";

export function useSubmitOrganizationVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitOrganizationVerification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization"],
      });

      toast.success("Organization submitted for verification successfully",);
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Failed to submit organization for verification",);
        return;
      }

      toast.error("Failed to submit organization for verification",);
    },
  });
}