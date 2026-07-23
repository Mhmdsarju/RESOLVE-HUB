import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { login } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore(
    (state) => state.setAccessToken,
  );

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);

      toast.success("Login successful");
    },

    onError: () => {
      toast.error("Login failed");
    },
  });
}