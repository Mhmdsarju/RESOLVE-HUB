import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { resendForgotPasswordOtp } from "../api/authApi";

export function useResendForgotPasswordOtp() {
  return useMutation({
    mutationFn: resendForgotPasswordOtp,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: () => {
      toast.error("Failed to resend OTP");
    },
  });
}