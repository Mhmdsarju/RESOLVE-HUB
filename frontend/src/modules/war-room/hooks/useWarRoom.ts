import { useQuery } from "@tanstack/react-query";

import { getWarRoomById } from "../api/warRoomApi";

import type { WarRoom } from "../types/warRoom.types";

export function useWarRoom(warRoomId: string) {
    return useQuery<WarRoom, Error>({
        queryKey: ["war-room", warRoomId],

        queryFn: () => getWarRoomById(warRoomId),

        enabled: Boolean(warRoomId),

        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
}