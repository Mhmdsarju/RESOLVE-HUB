import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { logout } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export function useLogout() {
  const clearUser = useAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      clearUser();

      toast.success("Logged out successfully");
    },

    onError: () => {
      toast.error("Logout failed");
    },
  });
}