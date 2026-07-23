import { api, ENDPOINTS } from "@/core/api";

import type { ApiResponse } from "@/core/types/api.types"; 

import type {
  LoginDto,
  LoginResponse,
} from "../types/login.types";
import type {
  RegisterDto,
  RegisterResponse,
} from "../types/register.types";
import type { RefreshResponse } from "../types/refresh.types";

export async function login(
  data: LoginDto,
): Promise<LoginResponse> {
  const response = await api.post<ApiResponse<LoginResponse>>(
    ENDPOINTS.AUTH.LOGIN,
    data,
  );

  return response.data.data;
}

export async function register(
  data: RegisterDto,
): Promise<RegisterResponse> {
  const response = await api.post<ApiResponse<RegisterResponse>>(
    ENDPOINTS.AUTH.REGISTER,
    data,
  );

  return response.data.data;
}

export async function logout(): Promise<void> {
  await api.post(ENDPOINTS.AUTH.LOGOUT);
}

export async function refresh(): Promise<RefreshResponse> {
  const response = await api.post<ApiResponse<RefreshResponse>>(
    ENDPOINTS.AUTH.REFRESH,
  );

  return response.data.data;
}