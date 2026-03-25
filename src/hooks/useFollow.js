import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export const followKeys = {
  isFollowing: (viewerId, profileUserId) => [
    "follows",
    "isFollowing",
    viewerId,
    profileUserId,
  ],
  counts: (profileUserId) => ["follows", "counts", profileUserId],
};

export function useIsFollowing(viewerId, profileUserId) {
  return useQuery({
    queryKey: followKeys.isFollowing(viewerId, profileUserId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("follows")
        .select("follower_id")
        .eq("follower_id", viewerId)
        .eq("following_id", profileUserId)
        .maybeSingle();

      if (error) throw error;
      return data !== null;
    },
    enabled: Boolean(viewerId) && Boolean(profileUserId),
  });
}

export function useFollowCounts(profileUserId) {
  return useQuery({
    queryKey: followKeys.counts(profileUserId),
    queryFn: async () => {
      const [followersRes, followingRes] = await Promise.all([
        supabase
          .from("follows")
          .select("follower_id", { count: "exact", head: true })
          .eq("following_id", profileUserId),
        supabase
          .from("follows")
          .select("following_id", { count: "exact", head: true })
          .eq("follower_id", profileUserId),
      ]);

      if (followersRes.error) throw followersRes.error;
      if (followingRes.error) throw followingRes.error;

      return {
        followers: followersRes.count ?? 0,
        following: followingRes.count ?? 0,
      };
    },
    enabled: Boolean(profileUserId),
  });
}

export function useToggleFollow(viewerId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ profileUserId, isFollowing }) => {
      if (!viewerId) throw new Error("Not authenticated");

      if (isFollowing) {
        const { error } = await supabase
          .from("follows")
          .delete()
          .eq("follower_id", viewerId)
          .eq("following_id", profileUserId);

        if (error) throw error;
        return { action: "unfollowed" };
      }

      const { error } = await supabase
        .from("follows")
        .upsert(
          { follower_id: viewerId, following_id: profileUserId },
          { onConflict: "follower_id,following_id", ignoreDuplicates: true },
        );

      if (error) throw error;
      return { action: "followed" };
    },

    onSuccess: ({ action }, { profileUserId }) => {
      queryClient.invalidateQueries({
        queryKey: followKeys.isFollowing(viewerId, profileUserId),
      });
      queryClient.invalidateQueries({
        queryKey: followKeys.counts(profileUserId),
      });
      toast.success(action === "followed" ? "Following" : "Unfollowed");
    },

    onError: (err) => {
      toast.error(`Failed: ${err.message}`);
    },
  });
}
