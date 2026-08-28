import { useEffect, type ReactNode } from "react";

import QueryProvider from "@/shared/providers/QueryProvider";
import ToastProvider from "@/shared/providers/ToastProvider";

import { useAuthStore } from "@/modules/auth/store/authStore";
import { connectSocket, disconnectSocket } from "@/core/config/socket";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) {
      disconnectSocket();
      return;
    }

    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [accessToken]);

  return (
    <QueryProvider>
      <ToastProvider />
      {children}
    </QueryProvider>
  );
}
