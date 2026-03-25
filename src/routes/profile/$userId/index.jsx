/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { UserCircle2 } from "lucide-react";
import { useProfile } from "../../../hooks/useProfiles";
import {
  useFollowCounts,
  useIsFollowing,
  useToggleFollow,
} from "../../../hooks/useFollow";
import { usePublicPrompts } from "../../../hooks/usePrompts";
import { Button } from "../../../components/ui/Button";
import { ErrorState } from "../../../components/ui/ErrorState";
import { PromptCard } from "../../../components/prompts/PromptCard";
import { EmptyState } from "../../../components/ui/EmptyState";
import { ProfileHeaderSkeleton } from "../../../components/ui/ProfileHeaderSkeleton";
import { useAuth } from "../../../hooks/useAuth";
import { ModelUsageChart } from "../../../components/profile/ModelUsageChart";

const PAGE_SIZE = 9;

function ProfilePage() {
  const { userId } = useParams({ from: "/profile/$userId/" });
  const { user } = useAuth();
  const {
    data: profile,
    isLoading,
    error,
    refetch: refetchProfile,
  } = useProfile(userId);
  const [page, setPage] = useState(1);

  const filters = useMemo(
    () => ({
      page,
      pageSize: PAGE_SIZE,
      authorId: userId,
      sort: "created_at",
    }),
    [page, userId],
  );
  const { data: prompts, isLoading: promptsLoading } =
    usePublicPrompts(filters);
  const { data: followCounts, isLoading: followCountsLoading } =
    useFollowCounts(userId);
  const { data: isFollowing = false, isLoading: isFollowingLoading } =
    useIsFollowing(user?.id, userId);
  const { mutate: toggleFollow, isPending: toggleFollowPending } =
    useToggleFollow(user?.id);

  if (isLoading) return <ProfileHeaderSkeleton />;
  if (error)
    return (
      <ErrorState
        title="Profile not found"
        message={error.message}
        onRetry={() => refetchProfile()}
      />
    );
  if (!profile) return <ErrorState title="Profile not found" message="" />;

  const isOwnProfile = user?.id === userId;
  const profileUserId = profile?.user_id ?? userId;
  const followButtonLoading =
    toggleFollowPending || isFollowingLoading || followCountsLoading;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-8">
      {/* Retro Trading Card Header - Redesigned */}
      <div className="relative border-[3px] border-[#1A1A1A] bg-[#F5C518] shadow-[6px_6px_0_#1A1A1A] overflow-hidden">
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')]"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
          {/* Avatar Area */}
          <div className="shrink-0 relative">
            <div className="absolute -inset-2 bg-black opacity-100 rotate-3 z-0"></div>
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.display_name || "User avatar"}
                className="relative z-10 h-32 w-32 border-[3px] border-[#1A1A1A] bg-white object-cover"
              />
            ) : (
              <div className="relative z-10 flex h-32 w-32 items-center justify-center border-[3px] border-[#1A1A1A] bg-white text-[#1A1A1A]">
                <UserCircle2 size={64} strokeWidth={1.5} />
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase drop-shadow-sm mb-2">
                {profile.display_name || "Anonymous Promptor"}
              </h1>
              <div className="inline-block bg-[#1A1A1A] text-[#F5C518] px-3 py-1 text-xs font-mono uppercase tracking-widest font-bold">
                Pro Prompter
              </div>
            </div>

            <p className="text-lg font-bold text-[#1A1A1A] max-w-2xl leading-relaxed border-l-4 border-black pl-4">
              {profile.bio || "No bio yet."}
            </p>

            {/* Stats Bar - Redesigned similar to newspaper stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-0 mt-6 pt-4 border-t-2 border-black/10">
              <div className="pr-6 border-r-2 border-black/10 text-center md:text-left">
                <span className="block text-3xl font-black text-[#1A1A1A] leading-none mb-1">
                  {followCounts?.followers ?? 0}
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#1A1A1A]/60">
                  Followers
                </span>
              </div>
              <div className="px-6 border-r-2 border-black/10 text-center md:text-left">
                <span className="block text-3xl font-black text-[#1A1A1A] leading-none mb-1">
                  {followCounts?.following ?? 0}
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#1A1A1A]/60">
                  Following
                </span>
              </div>
              <div className="pl-6 text-center md:text-left">
                <span className="block text-3xl font-black text-[#1A1A1A] leading-none mb-1">
                  {prompts?.length ?? 0}
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#1A1A1A]/60">
                  Prompts
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-35">
            {!isOwnProfile ? (
              <Button
                variant={isFollowing ? "secondary" : "primary"}
                isLoading={followButtonLoading}
                onClick={() =>
                  toggleFollow({ profileUserId: userId, isFollowing })
                }
                className="w-full bg-[#1A1A1A] text-white border-[3px] border-[#1A1A1A] hover:bg-white hover:text-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] py-3 text-lg uppercase tracking-wide"
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            ) : (
              <Link to="/settings" className="w-full">
                <Button
                  variant="secondary"
                  className="w-full bg-[#1A1A1A] text-white border-[3px] border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] py-3 text-lg uppercase tracking-wide hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1A1A1A]"
                >
                  Edit Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {isOwnProfile && <ModelUsageChart userId={profileUserId} />}

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b-[3px] border-[#1A1A1A] pb-4">
          <h2 className="text-2xl font-black uppercase tracking-tight">
            Public Prompts
          </h2>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={page === 1 || promptsLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-1 text-sm bg-white border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-y-0.5 hover:shadow-none active:translate-y-0.5"
            >
              Prev
            </Button>
            <Button
              variant="secondary"
              disabled={prompts?.length < PAGE_SIZE || promptsLoading}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-1 text-sm bg-white border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-y-0.5 hover:shadow-none active:translate-y-0.5"
            >
              Next
            </Button>
          </div>
        </div>

        {promptsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skeletons */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 border-[3px] border-[#1A1A1A] animate-pulse"
              ></div>
            ))}
          </div>
        ) : !prompts?.length ? (
          <EmptyState
            title="No public prompts"
            description="This user has not published prompts yet."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                currentUserId={user?.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/profile/$userId/")({
  validateSearch: (search) => search,
  component: ProfilePage,
});
