/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useAuth } from "../../hooks/useAuth";
import { PromptCard } from "../../components/prompts/PromptCard";
import { LoadingState } from "../../components/ui/LoadingState";
import { EmptyState } from "../../components/ui/EmptyState";
import { ErrorState } from "../../components/ui/ErrorState";

function BookmarksPage() {
  const { user } = useAuth();
  const userId = user?.id;
  const {
    data: bookmarks = [],
    isLoading,
    error,
    refetch,
  } = useBookmarks(userId);

  if (!userId) {
    return <ErrorState title="Not authenticated" message="Login required" />;
  }

  if (isLoading) {
    return <LoadingState label="Loading bookmarks..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Could not load bookmarks"
        message={error.message}
        onRetry={() => refetch()}
      />
    );
  }

  const prompts = bookmarks.map((b) => b.prompts).filter(Boolean);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 24 }}>
        Bookmarks
      </h1>

      {prompts.length === 0 ? (
        <div
          style={{
            color: "#555555",
            textAlign: "center",
            padding: 48,
          }}
        >
          No bookmarks yet — browse public prompts and save the ones you like
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              currentUserId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/bookmarks/")({
  component: BookmarksPage,
});
