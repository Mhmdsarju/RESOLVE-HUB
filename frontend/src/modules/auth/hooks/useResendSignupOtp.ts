import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { resendSignupOtp } from "../api/authApi";

export function useResendSignupOtp() {
  return useMutation({
    mutationFn: resendSignupOtp,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: () => {
      toast.error("Failed to resend OTP");
    },
  });
}