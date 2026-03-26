import { createFileRoute, redirect } from "@tanstack/react-router";
import { ModernLandingPage } from "../components/ModernLandingPage";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const { data } = await context.supabase.auth.getSession();
    if (data.session) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: ModernLandingPage,
});
