import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./index.css";
import "./styles/retroui-theme.css";
import { queryClient } from "./lib/queryClient";
import { supabase } from "./lib/supabase";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: {
    supabase,
    queryClient,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  </StrictMode>,
);
