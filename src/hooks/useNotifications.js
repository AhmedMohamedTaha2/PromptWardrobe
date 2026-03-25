import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const notificationKeys = {
  list: (userId) => ["notifications", userId],
  unreadCount: (userId) => ["notifications", "unread-count", userId],
};

export function useNotifications(userId) {
  return useQuery({
    queryKey: notificationKeys.list(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("id, type, payload, read_at, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data ?? [];
    },
    enabled: Boolean(userId),
  });
}

export function useMarkAllRead(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("notifications")
        .update({ read_at: new Date().toISOString() })
        .eq("user_id", userId)
        .is("read_at", null);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.list(userId),
      });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(userId),
      });
    },
  });
}

export function useMarkRead(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId) => {
      if (!userId) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("notifications")
        .update({ read_at: new Date().toISOString() })
        .eq("id", notificationId)
        .eq("user_id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.list(userId),
      });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(userId),
      });
    },
  });
}
