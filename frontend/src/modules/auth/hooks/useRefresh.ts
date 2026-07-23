import { useMutation } from "@tanstack/react-query";

import { refresh } from "../api/authApi";

export function useRefresh() {
  return useMutation({
    mutationFn: refresh,
  });
}