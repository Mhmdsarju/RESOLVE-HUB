import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateMe } from "../api/user.api";

import type { UpdateProfilePayload } from "../types/user.types";

export const useUpdateMe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateProfilePayload) =>
            updateMe(data),

        onSuccess: (updatedUser) => {
            queryClient.setQueryData(
                ["me"],
                updatedUser,
            );

            toast.success("Profile updated successfully");
        },

        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Failed to update profile",
            );
        },
    });
};