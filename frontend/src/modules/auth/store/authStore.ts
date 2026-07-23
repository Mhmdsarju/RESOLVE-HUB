import { create } from "zustand";

import type { AuthStore } from "@/modules/auth/types/auth.types";

export const useAuthStore = create<AuthStore>((set) => ({
    
    user: null,
    isAuthenticated: false,
    isLoading: false,

    setUser: (user) => set({ user, isAuthenticated: true, }),

    clearUser: () => set({ user: null, isAuthenticated: false, }),

    setLoading: (loading) => set({ isLoading: loading, }),

}));