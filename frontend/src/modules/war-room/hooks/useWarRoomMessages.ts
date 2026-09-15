import { useQuery } from "@tanstack/react-query";

import { getWarRoomMessages } from "../api/warRoomApi";

export function useWarRoomMessages(warRoomId: string, page = 1, limit = 10,) {

    return useQuery({
        queryKey: ["war-room-messages", warRoomId, page, limit,],
        queryFn: () => getWarRoomMessages(warRoomId, page, limit,),
        enabled: Boolean(warRoomId),
    });

}