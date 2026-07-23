import { create } from "zustand";

import type { AuthStore } from "@/modules/auth/types/auth.types";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  setAccessToken: (token) =>
    set({
      accessToken: token,
    }),

  clearUser: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),
}));