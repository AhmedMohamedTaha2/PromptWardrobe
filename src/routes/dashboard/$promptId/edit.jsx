/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { PromptForm } from "../../../components/prompts/PromptForm";
import { Button } from "../../../components/ui/Button";
import { LoadingState } from "../../../components/ui/LoadingState";
import { ErrorState } from "../../../components/ui/ErrorState";
import { useAuth } from "../../../hooks/useAuth";
import { usePrompt } from "../../../hooks/usePrompts";

function EditPromptPage() {
  const { promptId } = useParams({ from: "/dashboard/$promptId/edit" });
  const { user } = useAuth();

  const { data: prompt, isLoading, error } = usePrompt(user?.id, promptId);

  if (isLoading) return <LoadingState label="Loading prompt..." />;
  if (error) return <ErrorState title="Error" message={error.message} />;
  if (!prompt)
    return <ErrorState title="Not found" message="Prompt not found" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to={`/dashboard/${promptId}`}>
          <Button variant="secondary">← Back</Button>
        </Link>
        <div>
          <h1 className="text-4xl font-black tracking-tight">Edit Prompt</h1>
          <p className="text-sm text-gray-600 mt-2">
            Update your prompt details
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="border-2 border-black bg-white p-8 shadow-[4px_4px_0_#000]">
        <PromptForm initialData={prompt} isEditing />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/dashboard/$promptId/edit")({
  component: EditPromptPage,
});
