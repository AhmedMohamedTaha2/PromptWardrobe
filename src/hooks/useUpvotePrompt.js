import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { notificationKeys } from "./useNotifications";
import { toast } from "sonner";

export function useUpvotePrompt(viewerId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      promptId,
      promptOwnerId,
      promptTitle,
      isAlreadyUpvoted,
    }) => {
      if (!viewerId) throw new Error("Not authenticated");

      if (isAlreadyUpvoted) {
        const { error } = await supabase
          .from("prompt_upvotes")
          .delete()
          .eq("prompt_id", promptId)
          .eq("user_id", viewerId);

        if (error) throw error;
        return { action: "removed" };
      }

      const { error: upvoteError } = await supabase
        .from("prompt_upvotes")
        .insert({ prompt_id: promptId, user_id: viewerId });

      if (upvoteError) throw upvoteError;

      if (viewerId === promptOwnerId) return { action: "added" };

      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", viewerId)
        .single();

      const voterName = profile?.display_name ?? "Someone";

      const { error: notifError } = await supabase
        .from("notifications")
        .insert({
          user_id: promptOwnerId,
          type: "prompt_upvoted",
          payload: {
            prompt_id: promptId,
            author_id: viewerId,
            author_name: voterName,
            prompt_title: promptTitle,
          },
        });

      if (notifError) throw notifError;

      return { action: "added" };
    },

    onSuccess: ({ action }, { promptId, promptOwnerId }) => {
      queryClient.invalidateQueries({ queryKey: ["prompt_upvotes", promptId] });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(promptOwnerId),
      });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.list(promptOwnerId),
      });

      toast.success(action === "added" ? "Upvoted!" : "Upvote removed");
    },

    onError: (err) => {
      toast.error(`Failed: ${err.message}`);
    },
  });
}
