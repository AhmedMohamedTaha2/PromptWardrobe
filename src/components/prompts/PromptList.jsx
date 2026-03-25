import { useQuery } from "@tanstack/react-query";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../hooks/useAuth";
import { PromptCard } from "./PromptCard";
import { EmptyState } from "../ui/EmptyState";
import { ErrorState } from "../ui/ErrorState";
import { PromptCardSkeleton } from "../ui/PromptCardSkeleton";

export function PromptList() {
  const { user } = useAuth();
  const searchParams = useRouterState({ select: (s) => s.location.search });
  const navigate = useNavigate();

  const params = new URLSearchParams(searchParams);
  const category = params.get("category") || "all";
  const q = params.get("q") || "";
  const sort = params.get("sort") || "updated_at";

  const {
    data: prompts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["prompts", user?.id, category, q, sort],
    queryFn: async () => {
      if (!user?.id) return [];

      let query = supabase.from("prompts").select("*").eq("user_id", user.id);

      if (category && category !== "all") {
        query = query.eq("category", category);
      }

      if (q) {
        const like = `%${q}%`;
        query = query.or(`title.ilike.${like},content.ilike.${like}`);
      }

      query = query.order(sort, { ascending: false });

      const { data, error: queryError } = await query;
      if (queryError) throw queryError;
      return data ?? [];
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PromptCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error)
    return (
      <ErrorState
        title="Failed to load prompts"
        message={error.message}
        onRetry={() => refetch()}
      />
    );

  if (!prompts?.length) {
    if (q || category !== "all") {
      return (
        <EmptyState
          title="No results found"
          description="No prompts matched your filters. Try clearing search or switching categories."
        />
      );
    }
    return (
      <EmptyState
        title="No prompts yet"
        description="Your wardrobe is empty. Start building your collection."
        action={{
          label: "Create your first prompt",
          onClick: () => navigate({ to: "/dashboard/new" }),
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm font-bold text-[var(--text-secondary)]">
        <span>
          Showing {prompts.length} prompt{prompts.length === 1 ? "" : "s"}
        </span>
        {(q || category !== "all") && (
          <span className="badge--category">Filters active</span>
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 auto-rows-fr pb-12">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            currentUserId={user?.id}
          />
        ))}
      </div>
    </div>
  );
}
