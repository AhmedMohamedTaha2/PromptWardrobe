import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { promptKeys } from "./usePrompts";

/**
 * Publishes a prompt and enqueues notifications for followers.
 * Expects promptId, authorId, promptTitle to be provided.
 */
export function usePublishPrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ promptId, authorId, promptTitle }) => {
      if (!promptId || !authorId) throw new Error("Missing publish data");

      const { error: publishError } = await supabase
        .from("prompts")
        .update({ is_public: true, published_at: new Date().toISOString() })
        .eq("id", promptId)
        .eq("user_id", authorId);

      if (publishError) throw publishError;

      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", authorId)
        .single();

      const authorName = profile?.display_name ?? "Someone";

      const { data: follows, error: followsError } = await supabase
        .from("follows")
        .select("follower_id")
        .eq("following_id", authorId);

      if (followsError) throw followsError;
      if (!follows || follows.length === 0) return;

      const notifications = follows.map(({ follower_id }) => ({
        user_id: follower_id,
        type: "new_prompt_from_followed",
        payload: {
          prompt_id: promptId,
          author_id: authorId,
          author_name: authorName,
          prompt_title: promptTitle,
        },
      }));

      const { error: notifError, data: notifData } = await supabase
        .from("notifications")
        .insert(notifications);

      console.log("[usePublishPrompt] notif insert result:", {
        attempted: notifications.length,
        notifData,
        notifError,
      });

      if (notifError) throw notifError;
    },
    onSuccess: (_data, { authorId, promptId }) => {
      if (authorId) {
        queryClient.invalidateQueries({ queryKey: promptKeys.all(authorId) });
        queryClient.invalidateQueries({
          queryKey: promptKeys.detail(authorId, promptId),
        });
      }
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      toast.success("Prompt published!");
    },
    onError: (err) => {
      toast.error(`Publish failed: ${err.message}`);
    },
  });
}
