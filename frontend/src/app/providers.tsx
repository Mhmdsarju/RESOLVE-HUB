import type { ReactNode } from "react";

import QueryProvider from "@/shared/providers/QueryProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return <QueryProvider>{children}</QueryProvider>;
}
