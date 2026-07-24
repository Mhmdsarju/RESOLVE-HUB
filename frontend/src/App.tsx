import { RouterProvider } from "react-router-dom";

import { router } from "./app/router";

import AuthInitializer from "@/modules/auth/components/AuthInitializer";

export default function App() {
  return (
    <AuthInitializer>
      <RouterProvider router={router} />
    </AuthInitializer>
  );
}