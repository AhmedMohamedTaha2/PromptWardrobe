/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { SearchInput } from "../../components/ui/SearchInput";
import { CategoryTabs } from "../../components/ui/CategoryTabs";
import { PromptCard } from "../../components/prompts/PromptCard";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { EmptyState } from "../../components/ui/EmptyState";
import { useRef, useEffect } from "react";
import { usePublicPromptsFeed } from "../../hooks/usePrompts";
import { useAuth } from "../../hooks/useAuth";

function PublicFeedPage() {
  const search = Route.useSearch();
  const { user } = useAuth();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePublicPromptsFeed({
    category: search.category || "all",
    searchQuery: search.q || "",
  });

  const sentinelRef = useRef(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const prompts = data?.pages.flat() ?? [];

  return (
    <div className="space-y-4">
      <header className="space-y-3">
        <h1 className="text-3xl font-black">Public Prompts</h1>
        <p className="text-sm text-slate-600">
          Browse published prompts from everyone. Upvote the ones you like.
        </p>
        <div className="flex flex-col gap-3">
          <SearchInput
            routeFrom="/public/"
            placeholder="Search public prompts..."
          />
          <CategoryTabs routeFrom="/public/" />
        </div>
      </header>

      {isLoading ? (
        <LoadingState label="Loading public prompts..." />
      ) : isError ? (
        <ErrorState
          title="Could not load feed"
          message="Failed to load prompts"
          onRetry={() => {}}
        />
      ) : prompts.length === 0 ? (
        <EmptyState
          title="No public prompts yet"
          description="Be the first to publish a prompt!"
        />
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                currentUserId={user?.id}
              />
            ))}
          </div>

          {/* Sentinel — triggers next page load when scrolled into view */}
          <div
            ref={sentinelRef}
            style={{
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            {isFetchingNextPage && (
              <span
                style={{ fontSize: 13, color: "var(--color-text-secondary)" }}
              >
                Loading more...
              </span>
            )}
            {!hasNextPage && prompts.length > 0 && (
              <span
                style={{ fontSize: 13, color: "var(--color-text-secondary)" }}
              >
                You have reached the end
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/public/")({
  validateSearch: (search) => search,
  component: PublicFeedPage,
});
