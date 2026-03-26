import { useFollow } from "../../hooks/useFollow";
import { Button } from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { Loader2, Plus, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function FollowButton({ creatorId, className = "" }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isFollowing, follow, unfollow, isLoading } = useFollow(
    user?.id,
    creatorId,
  );

  // Don't show follow button for own profile
  if (user?.id === creatorId) return null;

  const handleClick = (e) => {
    e.stopPropagation(); // prevent navigation if placed inside a card link

    if (!user) {
      toast.error("Please login to follow creators");
      navigate({
        to: "/auth/login",
        search: { returnTo: `/profile/${creatorId}` },
      });
      return;
    }

    if (isFollowing) {
      unfollow();
    } else {
      follow();
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading && !isFollowing && user !== null}
      variant={isFollowing ? "outline" : "primary"}
      className={cn("min-w-30 transition-all duration-200", className)}
      aria-label={isFollowing ? "Unfollow this creator" : "Follow this creator"}
      aria-pressed={isFollowing || false}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          {isFollowing ? "Unfollowing..." : "Following..."}
        </>
      ) : isFollowing ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Following
        </>
      ) : (
        <>
          <Plus className="w-4 h-4 mr-2" />
          Follow
        </>
      )}
    </Button>
  );
}
