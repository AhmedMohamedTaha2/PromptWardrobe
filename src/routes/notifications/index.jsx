/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useMarkAllRead, useNotifications } from "../../hooks/useNotifications";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { EmptyState } from "../../components/ui/EmptyState";
import { Button } from "../../components/ui/Button";
import { NotificationItem } from "../../components/notifications/NotificationItem";

function NotificationsPage() {
  const { user } = useAuth();
  const userId = user?.id;
  const navigate = useNavigate();

  const {
    data: notifications,
    isLoading,
    error,
    refetch,
  } = useNotifications(userId);

  const { mutate: markAllRead, isPending: isMarkingAll } =
    useMarkAllRead(userId);

  useEffect(() => {
    if (!userId) {
      navigate({ to: "/auth/login" });
    }
  }, [navigate, userId]);

  const allRead = useMemo(
    () =>
      (notifications?.length ?? 0) > 0 &&
      notifications?.every((n) => n.read_at),
    [notifications],
  );

  if (!userId) {
    return <LoadingState label="Redirecting..." />;
  }

  if (isLoading) return <LoadingState label="Loading notifications..." />;
  if (error)
    return (
      <ErrorState
        title="Failed to load"
        message={error.message}
        onRetry={() => refetch()}
      />
    );

  if (!notifications?.length)
    return (
      <EmptyState
        title="No notifications"
        description="No notifications yet."
      />
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">Notifications</h1>
        <Button
          variant="secondary"
          onClick={() => markAllRead()}
          isLoading={isMarkingAll}
          disabled={isMarkingAll || allRead}
        >
          Mark all read
        </Button>
      </div>
      <div className="space-y-2">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/notifications/")({
  component: NotificationsPage,
});
