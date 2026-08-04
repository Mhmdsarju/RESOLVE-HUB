import { useMutation } from "@tanstack/react-query";

import { refresh } from "../api/authApi";

export function useRefreshToken() {
  return useMutation({
    mutationFn: refresh,
  });
}