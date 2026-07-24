import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { forgotPassword } from "../api/authApi";

import type {
  ForgotPasswordDto,
  ForgotPasswordResponse,
} from "../types/forgotPassword.types";

interface ErrorResponse {
  success: boolean;
  message: string;
}

export function useForgotPassword() {
  return useMutation<
    ForgotPasswordResponse,
    AxiosError<ErrorResponse>,
    ForgotPasswordDto
  >({
    mutationFn: forgotPassword,

    onSuccess: () => {
      toast.success("OTP sent successfully.");
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ??
        "Failed to send OTP.";

      toast.error(message);
    },
  });
}