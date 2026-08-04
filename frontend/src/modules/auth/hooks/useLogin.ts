import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { login } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

import type { LoginDto, LoginResponse, } from "../types/login.types";

interface ErrorResponse {
  success: boolean;
  message: string;
}

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);

  const setAccessToken = useAuthStore(
    (state) => state.setAccessToken,
  );

  return useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginDto>({
    mutationFn: login,

    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);

      toast.success("Login successful");
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ??
        "Login failed";

      toast.error(message);
    },
  });
}