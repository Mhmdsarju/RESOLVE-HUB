import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

import {
  rejectOrganizationVerification,
} from "../api/organizationApi";

interface RejectOrganizationVariables {
  organizationId: string;
  reason: string;
}

export function useRejectOrganizationVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ organizationId, reason, }: RejectOrganizationVariables) =>
      rejectOrganizationVerification(
        organizationId,
        reason,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization", "pending-verifications",],
      });

      queryClient.invalidateQueries({
        queryKey: ["organization", "verification"],
      });

      toast.success("Organization rejected successfully",);
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Failed to reject organization",);

        return;
      }

      toast.error("Failed to reject organization",);
    },
  });
}