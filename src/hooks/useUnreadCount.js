import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { notificationKeys } from "./useNotifications";

export function useUnreadCount(userId) {
  return useQuery({
    queryKey: notificationKeys.unreadCount(userId),
    queryFn: async () => {
      if (!userId) return 0;

      const { count, error } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .is("read_at", null);

      if (error) throw error;
      return count ?? 0;
    },
    enabled: Boolean(userId),
    refetchInterval: 30_000,
  });
}
