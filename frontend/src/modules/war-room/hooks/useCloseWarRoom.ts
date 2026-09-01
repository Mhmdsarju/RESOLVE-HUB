import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { closeWarRoom } from "../api/warRoomApi";

import type { WarRoom } from "../types/warRoom.types";

import type { ErrorResponse } from "@/core/types/error.types";


export function useCloseWarRoom() {
    
    const queryClient = useQueryClient();

    return useMutation<WarRoom, AxiosError<ErrorResponse>, string>({

        mutationFn: (warRoomId) => closeWarRoom(warRoomId),

        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["war-rooms"],
            });

            queryClient.setQueryData<WarRoom>(
                ["war-room", data.id],
                data,
            );

            toast.success("War room closed successfully");
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to close war room";

            toast.error(message);
        },
    });
}