import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { RatingStars } from "../ui/RatingStars";
import { useTokenEstimate } from "../../hooks/useTokenEstimate";
import { useCreatePrompt, useUpdatePrompt } from "../../hooks/usePrompts";
import { usePublishPrompt } from "../../hooks/usePublishPrompt";
import { categories, promptSchema } from "../../lib/schemas";

export function PromptForm({ initialData, isEditing }) {
  const navigate = useNavigate();
  const createPromptMutation = useCreatePrompt();
  const updatePromptMutation = useUpdatePrompt();
  const publishPromptMutation = usePublishPrompt();

  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      model: initialData?.model || "",
      category: initialData?.category || "general",
      rating: initialData?.rating || undefined,
      notes: initialData?.notes || "",
      token_estimate: initialData?.token_estimate || 0,
      is_public: initialData?.is_public ?? false,
      published_at: initialData?.published_at ?? null,
    },
    resolver: zodResolver(promptSchema),
  });

  const content = useWatch({ control: form.control, name: "content" });
  const rating = useWatch({ control: form.control, name: "rating" });
  const { count, confidence } = useTokenEstimate(content);

  useEffect(() => {
    form.setValue("token_estimate", count, { shouldDirty: false });
  }, [count, form]);

  const isPending =
    createPromptMutation.isPending ||
    updatePromptMutation.isPending ||
    publishPromptMutation.isPending;

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const shouldPublish =
        data.is_public &&
        (!initialData?.is_public || !initialData?.published_at);

      const payload = {
        ...data,
        published_at: data.is_public
          ? (initialData?.published_at ?? new Date().toISOString())
          : null,
      };

      let saved;

      if (isEditing && initialData?.id) {
        saved = await updatePromptMutation.mutateAsync({
          id: initialData.id,
          ...payload,
        });
      } else {
        saved = await createPromptMutation.mutateAsync(payload);
      }

      if (shouldPublish && saved) {
        await publishPromptMutation.mutateAsync({
          promptId: saved.id,
          authorId: saved.user_id,
          promptTitle: saved.title,
        });
      }

      if (!shouldPublish) {
        toast.success(
          isEditing
            ? "Prompt updated successfully"
            : "Prompt created successfully",
        );
      }

      navigate({
        to: isEditing ? `/dashboard/${saved.id}` : "/dashboard",
      });
    } catch (error) {
      toast.error(error.message ?? "Failed to save prompt");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="prompt-form-layout grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 items-start"
    >
      {/* Left Column: Primary Content */}
      <div className="flex flex-col gap-6">
        <div className="bg-white border-[3px] border-[#1A1A1A] p-6 shadow-[5px_5px_0_#1A1A1A]">
          <Input
            label="Title"
            placeholder="Give your prompt a catchy title"
            error={form.formState.errors.title?.message}
            {...form.register("title")}
            className="text-lg font-bold border-2 border-[#1A1A1A] focus:shadow-[3px_3px_0_#1A1A1A] transition-all"
          />
        </div>

        <div className="bg-white border-[3px] border-[#1A1A1A] p-6 shadow-[5px_5px_0_#1A1A1A] flex flex-col gap-4">
          <div className="flex justify-between items-baseline mb-1">
            <label className="text-base font-black uppercase tracking-wide text-[#1A1A1A]">
              Prompt Content
            </label>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#1A1A1A]/60 bg-gray-100 px-2 py-0.5 border-2 border-[#1A1A1A]/20 rounded-md">
              <span>~{count} tokens</span>
              <span className="w-1 h-1 rounded-full bg-[#1A1A1A]/30"></span>
              <span>{confidence} confidence</span>
            </div>
          </div>

          <Textarea
            rows={12}
            placeholder="Paste your prompt here..."
            error={form.formState.errors.content?.message}
            {...form.register("content")}
            className="font-mono text-sm leading-relaxed border-2 border-[#1A1A1A] focus:shadow-[3px_3px_0_#1A1A1A] transition-all p-4"
          />
        </div>

        <div className="bg-white border-[3px] border-[#1A1A1A] p-6 shadow-[5px_5px_0_#1A1A1A]">
          <Textarea
            label="Notes & Techniques"
            rows={4}
            placeholder="Add context, tips, or specific parameters..."
            {...form.register("notes")}
            className="border-2 border-[#1A1A1A] focus:shadow-[3px_3px_0_#1A1A1A] transition-all"
          />
        </div>
      </div>

      {/* Right Column: Metadata Sidebar */}
      <aside className="flex flex-col gap-6 sticky top-6">
        <div className="bg-[#FAF8F2] border-[3px] border-[#1A1A1A] p-6 shadow-[5px_5px_0_#1A1A1A] flex flex-col gap-5">
          <h3 className="text-xl font-black uppercase border-b-2 border-[#1A1A1A] pb-2 mb-2">
            Metadata
          </h3>

          <Input
            label="Model"
            placeholder="e.g. GPT-4o, Claude 3"
            {...form.register("model")}
            className="border-2 border-[#1A1A1A] focus:shadow-[2px_2px_0_#1A1A1A] transition-all bg-white"
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold uppercase tracking-wide text-[#1A1A1A]">
              Category
            </label>
            <div className="relative">
              <select
                {...form.register("category")}
                className="w-full appearance-none bg-white border-2 border-[#1A1A1A] px-3 py-2 text-sm font-bold shadow-[2px_2px_0_#1A1A1A] focus:outline-none focus:translate-y-[1px] focus:shadow-none transition-all cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.toUpperCase().replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 border-l-2 border-[#1A1A1A] pl-2">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="#1A1A1A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {form.formState.errors.category?.message && (
              <span className="text-xs font-bold text-red-600 mt-1">
                {form.formState.errors.category?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold uppercase tracking-wide text-[#1A1A1A]">
              Rating
            </span>
            <div className="bg-white border-2 border-[#1A1A1A] p-3 shadow-[2px_2px_0_#1A1A1A] flex justify-center">
              <RatingStars
                value={rating ?? 0}
                onChange={(value) =>
                  form.setValue("rating", value, { shouldDirty: true })
                }
                size={24}
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t-2 border-[#1A1A1A]">
            <label className="flex items-start gap-3 p-3 bg-white border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] cursor-pointer hover:bg-yellow-50 transition-colors">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 border-2 border-[#1A1A1A] accent-[#F5C518]"
                {...form.register("is_public")}
              />
              <div className="flex flex-col">
                <span className="font-bold text-[#1A1A1A]">Make Public?</span>
                <span className="text-xs text-[#1A1A1A]/70 font-medium leading-tight">
                  Visible to everyone in the community.
                </span>
              </div>
            </label>
          </div>

          <Button
            type="submit"
            isLoading={isPending}
            disabled={isPending}
            className="w-full mt-2 py-3 text-base bg-[#F5C518] text-[#1A1A1A] border-[3px] border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1A1A1A] active:translate-y-0.5 transition-all font-black uppercase tracking-wide"
          >
            {isPending
              ? "Saving..."
              : isEditing
                ? "Update Prompt"
                : "Save Prompt"}
          </Button>
        </div>
      </aside>
    </form>
  );
}
