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
    const originalRequest =
      error.config as RetryRequestConfig | undefined;


    if (!originalRequest) {
      return Promise.reject(error);
    }


    const requestUrl = originalRequest.url ?? "";


    // Do not try to refresh for authentication endpoints.
    const isAuthRequest =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/verify-signup-otp") ||
      requestUrl.includes("/auth/resend-signup-otp") ||
      requestUrl.includes("/auth/forgot-password") ||
      requestUrl.includes("/auth/verify-otp") ||
      requestUrl.includes("/auth/resend-forgot-password-otp") ||
      requestUrl.includes("/auth/reset-password") ||
      requestUrl.includes("/auth/change-password") ||
      requestUrl.includes("/auth/refresh") ||
      requestUrl.includes("/auth/logout");


    if (isAuthRequest) {
      return Promise.reject(error);
    }


    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;


      try {
        const { accessToken } = await refresh();


        useAuthStore
          .getState()
          .setAccessToken(accessToken);


        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;


        return api(originalRequest);

      } catch (refreshError) {
        useAuthStore
          .getState()
          .clearUser();


        return Promise.reject(refreshError);
      }
    }


    return Promise.reject(error);
  },
);