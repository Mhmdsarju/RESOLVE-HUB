import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { verifyOtp } from "../api/authApi";

import type { VerifyOtpDto, VerifyOtpResponse, } from "../types/verifyOtp.types";

interface ErrorResponse {
  success: boolean;
  message: string;
}

export function useVerifyOtp() {
  return useMutation<VerifyOtpResponse, AxiosError<ErrorResponse>, VerifyOtpDto>({
    mutationFn: verifyOtp,

    onSuccess: () => {
      toast.success("OTP verified.");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ??
        "OTP verification failed.",
      );
    },
  });
}