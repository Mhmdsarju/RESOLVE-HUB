import { api } from "@/core/api/axios";

import type { UpdateProfilePayload, UserProfile, } from "../types/user.types";

export const getMe = async (): Promise<UserProfile> => {
    const response = await api.get("/users/me");
    return response.data.data;
};

export const getUserById = async (userId: string,): Promise<UserProfile> => {
    const response = await api.get(`/users/${userId}`);
    return response.data.data;
};


export const updateMe = async (data: UpdateProfilePayload,): Promise<UserProfile> => {
    const response = await api.patch("/users/me", data);
    return response.data.data;
};