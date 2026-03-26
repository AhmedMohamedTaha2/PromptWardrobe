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

export function useFollow(viewerId, profileUserId) {
  const { data: isFollowing, isLoading: isFollowingLoading } = useIsFollowing(
    viewerId,
    profileUserId,
  );

  const { mutate: toggleFollow, isPending: isToggleLoading } =
    useToggleFollow(viewerId);

  const handleFollow = () => {
    toggleFollow({ profileUserId, isFollowing: false });
  };

  const handleUnfollow = () => {
    toggleFollow({ profileUserId, isFollowing: true });
  };

  return {
    isFollowing,
    isLoading: isFollowingLoading || isToggleLoading,
    follow: handleFollow,
    unfollow: handleUnfollow,
  };
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

    onMutate: async ({ profileUserId, isFollowing }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: followKeys.isFollowing(viewerId, profileUserId),
      });
      await queryClient.cancelQueries({
        queryKey: followKeys.counts(profileUserId),
      });

      // Snapshot the previous value
      const previousIsFollowing = queryClient.getQueryData(
        followKeys.isFollowing(viewerId, profileUserId),
      );
      const previousCounts = queryClient.getQueryData(
        followKeys.counts(profileUserId),
      );

      // Optimistically update to the new value
      queryClient.setQueryData(
        followKeys.isFollowing(viewerId, profileUserId),
        !isFollowing,
      );

      if (previousCounts) {
        queryClient.setQueryData(followKeys.counts(profileUserId), {
          ...previousCounts,
          followers: isFollowing
            ? Math.max(0, previousCounts.followers - 1)
            : previousCounts.followers + 1,
        });
      }

      // Return a context object with the snapshotted value
      return { previousIsFollowing, previousCounts, profileUserId };
    },

    onError: (err, variables, context) => {
      // Rollback to the previous value if mutation fails
      if (context?.previousIsFollowing !== undefined) {
        queryClient.setQueryData(
          followKeys.isFollowing(viewerId, context.profileUserId),
          context.previousIsFollowing,
        );
      }
      if (context?.previousCounts !== undefined) {
        queryClient.setQueryData(
          followKeys.counts(context.profileUserId),
          context.previousCounts,
        );
      }
      toast.error(`Failed: ${err.message}`);
    },

    onSettled: (data, error, variables) => {
      // Always refetch after error or success to ensure sync
      queryClient.invalidateQueries({
        queryKey: followKeys.isFollowing(viewerId, variables.profileUserId),
      });
      queryClient.invalidateQueries({
        queryKey: followKeys.counts(variables.profileUserId),
      });
    },

    onSuccess: ({ action }) => {
      toast.success(action === "followed" ? "Following" : "Unfollowed");
    },
  });
}
