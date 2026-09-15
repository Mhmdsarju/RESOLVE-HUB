import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type { ApiResponse } from "@/core/types/api.types";

import type { User } from "../types/auth.types"; 

export async function getUsers(): Promise<User[]> {
  const response = await api.get<ApiResponse<User[]>>(
    ENDPOINTS.USER.BASE,
  );

  return response.data.data;
}