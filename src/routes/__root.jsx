import { Suspense } from "react";
import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";
import { AppShell } from "../components/layout/AppShell";
import { PageLoader } from "../components/ui/PageLoader";
import { ErrorState } from "../components/ui/ErrorState";
import { ErrorBoundary } from "../components/ui/ErrorBoundary";

export const Route = createRootRouteWithContext()({
  beforeLoad: async ({ context, location }) => {
    const isAuthRoute = location.pathname.startsWith("/auth");
    const isPublicRoute =
      location.pathname.startsWith("/public") ||
      location.pathname.startsWith("/profile") ||
      location.pathname === "/"; // Allow landing page

    const {
      data: { session },
      error,
    } = await context.supabase.auth.getSession();

    if (error) {
      console.error("Auth session error:", error);
    }

    if (!session && !isAuthRoute && !isPublicRoute) {
      throw redirect({
        to: "/auth/login",
        search: { redirect: location.href },
      });
    }

    if (session && isAuthRoute) {
      throw redirect({ to: "/dashboard" });
    }

    return { session };
  },
  component: () => (
    <ErrorBoundary>
      <AppShell>
        <Suspense fallback={<PageLoader message="Loading page..." />}>
          <Outlet />
        </Suspense>
      </AppShell>
    </ErrorBoundary>
  ),
  pendingComponent: () => <PageLoader message="Loading page..." />,
  errorComponent: () => (
    <ErrorState title="Error" message="Something broke loading this page." />
  ),
  notFoundComponent: () => (
    <ErrorState title="Not found" message="This page does not exist." />
  ),
});
