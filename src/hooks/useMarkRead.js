import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { notificationKeys } from "./useNotifications";

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
