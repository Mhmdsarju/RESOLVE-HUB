import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { register } from "../api/authApi";

import type { RegisterDto, RegisterResponse, } from "../types/register.types";

export function useRegister() {
  return useMutation<
    RegisterResponse,
    AxiosError<{ message: string }>,
    RegisterDto
  >({
    mutationFn: register,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Registration failed.";
      toast.error(message);
    },
  });
}