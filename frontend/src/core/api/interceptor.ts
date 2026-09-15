import { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

import { api } from "./axios";
import { refresh } from "@/modules/auth/api/authApi";
import { useAuthStore } from "@/modules/auth/store/authStore";


interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}


let refreshPromise: Promise<string> | null = null;


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
        if (!refreshPromise) {
          refreshPromise = refresh()
            .then(({ accessToken }) => {
              useAuthStore
                .getState()
                .setAccessToken(accessToken);

              return accessToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }


        const accessToken = await refreshPromise;


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