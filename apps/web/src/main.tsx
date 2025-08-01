import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "@/src/routeTree.gen.ts";
import {
  createRouter as createTanStackRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import "@workspace/ui/globals.css";

const queryClient = new QueryClient();

const router = routerWithQueryClient(
  createTanStackRouter({
    defaultSsr: false,
    routeTree,
    context: { queryClient },
  }),
  queryClient
);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
