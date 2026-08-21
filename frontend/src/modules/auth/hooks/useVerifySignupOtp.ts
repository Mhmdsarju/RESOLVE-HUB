import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { verifySignupOtp } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

import type { VerifySignupOtpDto, VerifySignupOtpResponse, } from "../types/verifySignupOtp.types";

export function useVerifySignupOtp() {
  const setUser = useAuthStore((state) => state.setUser);

  const setAccessToken = useAuthStore(
    (state) => state.setAccessToken,
  );

  return useMutation<VerifySignupOtpResponse, AxiosError<{ message: string }>, VerifySignupOtpDto>({
    mutationFn: verifySignupOtp,

    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);

      toast.success("Email verified successfully.");
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "OTP verification failed.";
      toast.error(message);
    },
  });
}