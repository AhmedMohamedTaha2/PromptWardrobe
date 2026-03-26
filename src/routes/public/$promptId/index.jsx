/* eslint-disable react-refresh/only-export-components */
import {
  createFileRoute,
  Link,
  useParams,
  useNavigate,
} from "@tanstack/react-router";
import { format, formatDistanceToNow } from "date-fns";
import { Button } from "../../../components/ui/Button";
import { LoadingState } from "../../../components/ui/LoadingState";
import { ErrorState } from "../../../components/ui/ErrorState";
import { RatingStars } from "../../../components/ui/RatingStars";
import { usePublicPrompt, useUpvotes } from "../../../hooks/usePrompts";
import { useAuth } from "../../../hooks/useAuth";
import { useUpvotePrompt } from "../../../hooks/useUpvotePrompt";
import { FollowButton } from "../../../components/profile/FollowButton";

function PublicPromptDetail() {
  const { promptId } = useParams({ from: "/public/$promptId/" });
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: prompt, isLoading, error } = usePublicPrompt(promptId);
  const { data: upvoteState } = useUpvotes(promptId);
  const { mutate: upvote, isPending: upvotePending } = useUpvotePrompt(
    user?.id,
  );

  if (isLoading) return <LoadingState label="Loading prompt..." />;
  if (error)
    return (
      <ErrorState
        title="Not found"
        message={error.message ?? "Prompt not found or is private"}
        onRetry={() => navigate({ to: "/public" })}
      />
    );
  if (!prompt)
    return (
      <ErrorState
        title="Not found"
        message="Prompt not found"
        onRetry={() => navigate({ to: "/public" })}
      />
    );

  const author = prompt.profiles;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/public">
            <Button variant="secondary">← Back</Button>
          </Link>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-black">{prompt.title}</h1>
              <span className="rounded-none border-2 border-green-800 bg-green-200 px-2 py-0.5 text-xs font-black uppercase shadow-[2px_2px_0_#000]">
                Public
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm text-slate-600">
                By {author?.display_name || "Anonymous"}
              </p>
              <FollowButton
                creatorId={prompt.user_id}
                className="h-6 text-xs px-2 py-0 min-w-0"
              />
            </div>
            {prompt.published_at && (
              <p className="text-xs text-slate-500">
                Published {format(new Date(prompt.published_at), "PPP p")}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={upvoteState?.hasUpvoted ? "secondary" : "primary"}
            isLoading={upvotePending}
            onClick={() =>
              upvote({
                promptId,
                promptOwnerId: prompt.user_id,
                promptTitle: prompt.title,
                isAlreadyUpvoted: upvoteState?.hasUpvoted,
              })
            }
            title={user ? "Upvote this prompt" : "Login to upvote"}
          >
            👍 {upvoteState?.count ?? 0}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0_#000]">
          <h2 className="text-xs font-black uppercase text-gray-600">
            Content
          </h2>
          <p className="mt-3 whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {prompt.content}
          </p>
        </div>

        {prompt.notes && (
          <div className="border-2 border-black bg-white p-4 shadow-[2px_2px_0_#000]">
            <h2 className="text-xs font-black uppercase text-gray-600">
              Notes
            </h2>
            <p className="mt-2 text-sm">{prompt.notes}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <InfoCard
            label="Category"
            value={prompt.category?.replace(/_/g, " ") || "—"}
          />
          <InfoCard label="Model" value={prompt.model || "—"} />
          <InfoCard label="Tokens" value={prompt.token_estimate ?? "—"} />
          <div className="border-2 border-black bg-white p-4 shadow-[2px_2px_0_#000]">
            <p className="text-xs font-black uppercase text-gray-600">Rating</p>
            <div className="mt-2">
              {prompt.rating ? (
                <RatingStars value={prompt.rating} readOnly />
              ) : (
                <p className="text-gray-500">Not rated</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-2 border-dashed border-black bg-white p-4 text-sm">
          <p>
            <span className="font-semibold">Created:</span>{" "}
            {format(new Date(prompt.created_at), "PPP p")} (
            {formatDistanceToNow(new Date(prompt.created_at), {
              addSuffix: true,
            })}
            )
          </p>
          {prompt.updated_at && (
            <p>
              <span className="font-semibold">Updated:</span>{" "}
              {format(new Date(prompt.updated_at), "PPP p")} (
              {formatDistanceToNow(new Date(prompt.updated_at), {
                addSuffix: true,
              })}
              )
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="border-2 border-black bg-white p-4 shadow-[2px_2px_0_#000]">
      <p className="text-xs font-black uppercase text-gray-600">{label}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}

export const Route = createFileRoute("/public/$promptId/")({
  validateSearch: (search) => search,
  component: PublicPromptDetail,
});
