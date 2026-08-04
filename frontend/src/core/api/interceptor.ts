import { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

import { api } from "./axios";
import { refresh } from "@/modules/auth/api/authApi";
import { useAuthStore } from "@/modules/auth/store/authStore";

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;

    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/verify-signup-otp")
    ) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await refresh();

        useAuthStore.getState().setAccessToken(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch {
        useAuthStore.getState().clearUser();
      }
    }

    return Promise.reject(error);
  },
);