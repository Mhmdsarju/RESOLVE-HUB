import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

import {
  approveOrganizationVerification,
} from "../api/organizationApi";

export function useApproveOrganizationVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (organizationId: string) =>
      approveOrganizationVerification(organizationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "organization",
          "pending-verifications",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["organization", "verification"],
      });

      toast.success(
        "Organization approved successfully",
      );
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
          "Failed to approve organization",
        );

        return;
      }

      toast.error(
        "Failed to approve organization",
      );
    },
  });
}