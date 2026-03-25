/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from "@tanstack/react-router";
import { PromptForm } from "../../components/prompts/PromptForm";
import { Button } from "../../components/ui/Button";

function NewPromptPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="secondary" className="transition-all">
            ← Back
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#1A1A1A]">
            Create Prompt
          </h1>
          <p className="text-sm text-[#555555] mt-2">
            Add a new prompt to your wardrobe
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="border-2 border-black bg-white p-8 shadow-[4px_4px_0_#000]">
        <PromptForm />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/dashboard/new")({
  component: NewPromptPage,
});
