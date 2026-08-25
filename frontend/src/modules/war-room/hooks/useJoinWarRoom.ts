import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { joinWarRoom } from "../api/warRoomApi";

import type { WarRoom } from "../types/warRoom.types";

import type { ErrorResponse } from "@/core/types/error.types";


export function useJoinWarRoom() {
    const queryClient = useQueryClient();

    return useMutation<WarRoom, AxiosError<ErrorResponse>, string>({
        mutationFn: (warRoomId) => joinWarRoom(warRoomId),

        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["war-rooms"],
            });

            queryClient.setQueryData<WarRoom>(
                ["war-room", data.id],
                data,
            );

            toast.success("Joined war room successfully");
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to join war room";
            toast.error(message);
        },
    });
}