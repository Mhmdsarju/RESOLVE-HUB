import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { leaveWarRoom } from "../api/warRoomApi";

import type { ErrorResponse } from "@/core/types/error.types";


export function useLeaveWarRoom() {
    
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError<ErrorResponse>, string>({
        mutationFn: (warRoomId) => leaveWarRoom(warRoomId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["war-rooms"],
            });

            toast.success("Left war room successfully");
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to leave war room";
            toast.error(message);
        },
    });
}