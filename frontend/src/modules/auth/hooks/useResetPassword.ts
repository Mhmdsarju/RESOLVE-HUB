import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { resetPassword } from "../api/authApi";

import type { ResetPasswordDto, ResetPasswordResponse, } from "../types/resetPassword.types";

interface ErrorResponse {
    success: boolean;
    message: string;
}

export function useResetPassword() {
    return useMutation<ResetPasswordResponse, AxiosError<ErrorResponse>, ResetPasswordDto>({
        mutationFn: resetPassword,

        onSuccess: () => {
            toast.success(
                "Password reset successfully.",
            );
        },

        onError: (error) => {
            toast.error(error.response?.data?.message ?? "Password reset failed.",);
        },
    });
}