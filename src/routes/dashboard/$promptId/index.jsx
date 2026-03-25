/* eslint-disable react-refresh/only-export-components */
import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Button } from "../../../components/ui/Button";
import { LoadingState } from "../../../components/ui/LoadingState";
import { ErrorState } from "../../../components/ui/ErrorState";
import { RatingStars } from "../../../components/ui/RatingStars";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { usePrompt, usePromptMutations } from "../../../hooks/usePrompts";
import { useUpvotes } from "../../../hooks/usePrompts";
import { useUpvotePrompt } from "../../../hooks/useUpvotePrompt";

function PromptDetailPage() {
  const { promptId } = useParams({ from: "/dashboard/$promptId/" });
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { data: prompt, isLoading, error } = usePrompt(user?.id, promptId);
  const isOwner = prompt?.user_id === user?.id;
  const { data: upvoteState } = useUpvotes(promptId);
  const { mutate: upvote, isPending: upvotePending } = useUpvotePrompt(
    user?.id,
  );

  const { deleteMutation } = usePromptMutations(user?.id);

  const handleDelete = () => {
    if (!user?.id) {
      toast.error("Not authenticated");
      return;
    }
    deleteMutation.mutate(promptId, {
      onSuccess: () => {
        toast.success("Prompt deleted successfully");
        navigate({ to: "/dashboard" });
      },
      onError: (err) => {
        toast.error(err.message ?? "Failed to delete prompt");
      },
    });
  };

  const permissionDenied =
    error?.code === "PGRST301" ||
    error?.code === "PGRST116" ||
    error?.message?.toLowerCase().includes("permission") ||
    error?.message?.toLowerCase().includes("no rows");

  if (isLoading) return <LoadingState label="Loading prompt..." />;
  if (error && permissionDenied)
    return <ErrorState title="Not found" message="Prompt not found" />;
  if (error)
    return (
      <ErrorState
        title="Error"
        message={error.message ?? "Unable to load this prompt"}
      />
    );
  if (!prompt)
    return <ErrorState title="Not found" message="Prompt not found" />;

  if (!prompt.is_public && !isOwner) {
    return <ErrorState title="Not allowed" message="This prompt is private." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="secondary">← Back</Button>
          </Link>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-black tracking-tight">
                {prompt.title}
              </h1>
              <span
                className={`rounded-none border-2 px-2 py-0.5 text-xs font-black uppercase shadow-[2px_2px_0_#000] ${prompt.is_public ? "border-green-800 bg-green-200" : "border-slate-800 bg-slate-200"}`}
              >
                {prompt.is_public ? "Public" : "Private"}
              </span>
            </div>
            {prompt.is_public && prompt.published_at && (
              <p className="text-xs text-slate-600">
                Published {format(new Date(prompt.published_at), "PPP p")}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {prompt.is_public && (
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
            >
              👍 {upvoteState?.count ?? 0}
            </Button>
          )}
          {isOwner && (
            <>
              <Link to={`/dashboard/${promptId}/edit`}>
                <Button variant="primary">Edit</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Main content box */}
        <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0_#000]">
          <div className="space-y-4">
            <div>
              <h2 className="text-xs font-black tracking-tight uppercase text-gray-600">
                Content
              </h2>
              <p className="mt-3 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {prompt.content}
              </p>
            </div>

            {prompt.notes && (
              <div className="border-t-2 border-black pt-4">
                <h2 className="text-xs font-black tracking-tight uppercase text-gray-600">
                  Notes
                </h2>
                <p className="mt-2 text-sm">{prompt.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="border-2 border-black bg-white p-4 shadow-[2px_2px_0_#000]">
            <p className="text-xs font-black tracking-tight uppercase text-gray-600">
              Category
            </p>
            <p className="mt-2 font-semibold capitalize">
              {prompt.category.replace(/_/g, " ")}
            </p>
          </div>

          <div className="border-2 border-black bg-white p-4 shadow-[2px_2px_0_#000]">
            <p className="text-xs font-black tracking-tight uppercase text-gray-600">
              Model
            </p>
            <p className="mt-2 font-semibold">{prompt.model || "—"}</p>
          </div>

          <div className="border-2 border-black bg-white p-4 shadow-[2px_2px_0_#000]">
            <p className="text-xs font-black tracking-tight uppercase text-gray-600">
              Tokens
            </p>
            <p className="mt-2 font-semibold">{prompt.token_estimate || "—"}</p>
          </div>

          <div className="border-2 border-black bg-white p-4 shadow-[2px_2px_0_#000]">
            <p className="text-xs font-black tracking-tight uppercase text-gray-600">
              Rating
            </p>
            <div className="mt-2">
              {prompt.rating ? (
                <RatingStars value={prompt.rating} readOnly />
              ) : (
                <p className="text-gray-500">Not rated</p>
              )}
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="border-2 border-dashed border-black bg-white p-4">
          <div className="space-y-2 text-sm">
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

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0_#000]">
            <h2 className="mb-4 text-xl font-black tracking-tight">
              Delete Prompt?
            </h2>
            <p className="mb-6 text-sm">
              Are you sure you want to delete "{prompt.title}"? This action
              cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                isLoading={deleteMutation.isPending}
                onClick={handleDelete}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/dashboard/$promptId/")({
  component: PromptDetailPage,
});
