import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createWarRoom } from "../api/warRoomApi";

import type { CreateWarRoomPayload, WarRoom, } from "../types/warRoom.types";

import type { ErrorResponse } from "@/core/types/error.types";


export function useCreateWarRoom() {
    const queryClient = useQueryClient();

    return useMutation<WarRoom, AxiosError<ErrorResponse>, CreateWarRoomPayload>({
        
        mutationFn: (data) => createWarRoom(data),

        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["war-rooms"],
            });

            queryClient.setQueryData<WarRoom>(
                ["war-room", data.id],
                data,
            );

            toast.success("War room created successfully");
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to create war room";

            toast.error(message);
        },
    });
}