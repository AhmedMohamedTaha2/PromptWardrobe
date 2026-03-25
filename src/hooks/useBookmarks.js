import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export const bookmarkKeys = {
  all: (userId) => ["bookmarks", userId],
  isBookmarked: (userId, promptId) => ["bookmarks", "check", userId, promptId],
};

export function useBookmarks(userId) {
  return useQuery({
    queryKey: bookmarkKeys.all(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select(
          `
          id,
          created_at,
          prompt_id,
          prompts (
            id,
            title,
            content,
            category,
            rating,
            model,
            is_public,
            created_at,
            updated_at,
            user_id,
            token_estimate,
            profiles (
              display_name,
              avatar_url
            )
          )
        `,
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
    enabled: Boolean(userId),
  });
}

export function useIsBookmarked(userId, promptId) {
  return useQuery({
    queryKey: bookmarkKeys.isBookmarked(userId, promptId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", userId)
        .eq("prompt_id", promptId)
        .maybeSingle();

      if (error) throw error;
      return data !== null;
    },
    enabled: Boolean(userId) && Boolean(promptId),
  });
}

export function useToggleBookmark(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ promptId, isBookmarked }) => {
      if (!userId) throw new Error("Not authenticated");

      if (isBookmarked) {
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", userId)
          .eq("prompt_id", promptId);
        if (error) throw error;
        return { action: "removed", promptId };
      }

      const { error } = await supabase
        .from("bookmarks")
        .insert({ user_id: userId, prompt_id: promptId });
      if (error) throw error;
      return { action: "added", promptId };
    },
    onSuccess: ({ action, promptId }) => {
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.all(userId) });
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.isBookmarked(userId, promptId),
      });
      toast.success(action === "added" ? "Bookmarked" : "Bookmark removed");
    },
    onError: (err) => {
      toast.error(`Failed: ${err.message}`);
    },
  });
}
