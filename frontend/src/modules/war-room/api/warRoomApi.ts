import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type {
    CreateWarRoomPayload,
    GetWarRoomsParams,
    GetWarRoomsResponse,
    WarRoom,
    GetWarRoomMessagesResponse,
} from "../types/warRoom.types";


export async function createWarRoom(payload: CreateWarRoomPayload,): Promise<WarRoom> {
    const response = await api.post(
        ENDPOINTS.WAR_ROOM.BASE,
        payload,
    );

    return response.data.data;
}


export async function getWarRooms(params: GetWarRoomsParams,): Promise<GetWarRoomsResponse> {
    const response = await api.get(
        ENDPOINTS.WAR_ROOM.BASE,
        {
            params,
        },
    );

    return response.data.data;
}


export async function getWarRoomById(warRoomId: string,): Promise<WarRoom> {
    const response = await api.get(
        ENDPOINTS.WAR_ROOM.BY_ID(warRoomId),
    );

    return response.data.data;
}


export async function getWarRoomMessages(warRoomId: string, page = 1, limit = 50,): Promise<GetWarRoomMessagesResponse> {
    const response = await api.get(
        ENDPOINTS.WAR_ROOM.MESSAGES(warRoomId),
        {
            params: {
                page,
                limit,
            },
        },
    );

    return response.data.data;
}


export async function closeWarRoom(warRoomId: string,): Promise<WarRoom> {
    const response = await api.patch(
        ENDPOINTS.WAR_ROOM.CLOSE(warRoomId),
    );

    return response.data.data;
}


export async function joinWarRoom(warRoomId: string,): Promise<WarRoom> {
    const response = await api.post(
        ENDPOINTS.WAR_ROOM.JOIN(warRoomId),
    );

    return response.data.data;
}


export async function leaveWarRoom(warRoomId: string,): Promise<void> {
    await api.post(
        ENDPOINTS.WAR_ROOM.LEAVE(warRoomId),
    );
}