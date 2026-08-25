import { useQuery } from "@tanstack/react-query";

import { getWarRooms } from "../api/warRoomApi";

import type { GetWarRoomsParams, GetWarRoomsResponse, } from "../types/warRoom.types";

export function useWarRooms(params: GetWarRoomsParams,) {
    return useQuery<GetWarRoomsResponse, Error>({
        queryKey: [
            "war-rooms",
            params.page,
            params.limit,
            params.status,
            params.search,
        ],

        queryFn: () => getWarRooms(params),

        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: 10000,
        refetchIntervalInBackground: false,
    });
}