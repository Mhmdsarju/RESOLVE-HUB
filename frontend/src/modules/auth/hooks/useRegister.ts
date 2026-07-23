import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { register } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export function useRegister() {
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore(
    (state) => state.setAccessToken,
  );

  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);

      toast.success("Registration successful");
    },

    onError: () => {
      toast.error("Registration failed");
    },
  });
}