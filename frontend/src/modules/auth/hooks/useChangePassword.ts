import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/authApi";
import type { ChangePasswordDto } from "../types/changePassword";

export function useChangePassword() {
    return useMutation({
        mutationFn: (data: ChangePasswordDto) => changePassword(data),
    })
}

