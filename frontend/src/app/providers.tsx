import {  type ReactNode } from "react";

import QueryProvider from "@/shared/providers/QueryProvider";
import ToastProvider from "@/shared/providers/ToastProvider";


interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {

  return (
    <QueryProvider>
      <ToastProvider />
      {children}
    </QueryProvider>
  );
}








  // const accessToken = useAuthStore((state) => state.accessToken);

  // useEffect(() => {
  //   if (!accessToken) {
  //     disconnectSocket();
  //     return;
  //   }

  //   connectSocket();

  //   return () => {
  //     disconnectSocket();
  //   };
  // }, [accessToken]);
