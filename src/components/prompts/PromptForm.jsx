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
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        gap: "24px",
        alignItems: "start",
      }}
    >
      {/* Left Column: Primary Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Title Card */}
        <div
          style={{
            background: "var(--color-surface)",
            border: "2.5px solid var(--color-border)",
            borderRadius: "10px",
            boxShadow: "6px 6px 0px var(--color-border)",
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <label
            style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text)",
            }}
          >
            Title
          </label>
          <input
            placeholder="Give your prompt a catchy title"
            {...form.register("title")}
            style={{
              border: "2.5px solid var(--color-border)",
              borderRadius: "6px",
              background: "var(--color-bg)",
              padding: "12px 16px",
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--color-text)",
              outline: "none",
              transition: "box-shadow 0.15s ease, border-width 0.15s ease",
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = "3px 3px 0px var(--color-border)";
              e.target.style.borderWidth = "3px";
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = "none";
              e.target.style.borderWidth = "2.5px";
            }}
          />
          {form.formState.errors.title?.message && (
            <span
              style={{ fontSize: "0.75rem", fontWeight: 600, color: "#e63946" }}
            >
              {form.formState.errors.title?.message}
            </span>
          )}
        </div>

        {/* Prompt Content Card */}
        <div
          style={{
            background: "var(--color-surface)",
            border: "2.5px solid var(--color-border)",
            borderRadius: "10px",
            boxShadow: "6px 6px 0px var(--color-border)",
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Row: section title + token badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-text)",
              }}
            >
              Prompt Content
            </span>

            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                border: "2px solid var(--color-border)",
                borderRadius: "20px",
                padding: "4px 12px",
                background: "var(--color-bg)",
                boxShadow: "2px 2px 0px var(--color-border)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--color-text)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--color-muted)",
                  display: "inline-block",
                }}
              />
              ~{count} tokens &middot; {confidence} confidence
            </span>
          </div>

          <textarea
            placeholder="Paste your prompt here..."
            rows={14}
            {...form.register("content")}
            style={{
              border: "2.5px solid var(--color-border)",
              borderRadius: "8px",
              background: "var(--color-bg)",
              padding: "16px 18px",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "var(--color-text)",
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
              transition: "box-shadow 0.15s ease",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = "4px 4px 0px var(--color-border)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
          {form.formState.errors.content?.message && (
            <span
              style={{ fontSize: "0.75rem", fontWeight: 600, color: "#e63946" }}
            >
              {form.formState.errors.content?.message}
            </span>
          )}
        </div>

        {/* Notes Card */}
        <div
          style={{
            background: "var(--color-surface)",
            border: "2.5px solid var(--color-border)",
            borderRadius: "10px",
            boxShadow: "6px 6px 0px var(--color-border)",
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <label
            style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text)",
            }}
          >
            Notes & Techniques
          </label>
          <textarea
            placeholder="Add context, tips, or specific parameters..."
            rows={4}
            {...form.register("notes")}
            style={{
              border: "2.5px solid var(--color-border)",
              borderRadius: "6px",
              background: "var(--color-bg)",
              padding: "12px 16px",
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--color-text)",
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
              transition: "box-shadow 0.15s ease",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = "3px 3px 0px var(--color-border)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
        </div>
      </div>

      {/* Right Column: Metadata Sidebar */}
      <aside
        style={{
          background: "var(--color-surface)",
          border: "2.5px solid var(--color-border)",
          borderRadius: "10px",
          boxShadow: "6px 6px 0px var(--color-border)",
          padding: "28px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          position: "sticky",
          top: "24px",
        }}
      >
        {/* Header */}
        <div>
          <h3
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: 0,
              color: "var(--color-text)",
            }}
          >
            Metadata
          </h3>
          <hr
            style={{
              border: "none",
              borderTop: "2px solid var(--color-border)",
              marginTop: "12px",
            }}
          />
        </div>

        {/* Model field */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label
            style={{
              color: "var(--color-text)",
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Model
          </label>
          <input
            placeholder="e.g. GPT-4o, Claude 3"
            {...form.register("model")}
            style={{
              border: "2.5px solid var(--color-border)",
              borderRadius: "6px",
              background: "var(--color-bg)",
              padding: "10px 14px",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--color-text)",
              outline: "none",
              transition: "box-shadow 0.15s ease",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = "3px 3px 0px var(--color-border)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
        </div>

        {/* Category field */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label
            style={{
              color: "var(--color-text)",
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Category
          </label>
          <select
            {...form.register("category")}
            style={{
              border: "2.5px solid var(--color-border)",
              borderRadius: "6px",
              background: "var(--color-bg)",
              padding: "10px 14px",
              fontSize: "0.875rem",
              fontWeight: 700,
              appearance: "none",
              cursor: "pointer",
              color: "var(--color-text)",
              outline: "none",
              transition: "box-shadow 0.15s ease",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = "3px 3px 0px var(--color-border)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase().replace(/_/g, " ")}
              </option>
            ))}
          </select>
          {form.formState.errors.category?.message && (
            <span
              style={{ fontSize: "0.75rem", fontWeight: 600, color: "#e63946" }}
            >
              {form.formState.errors.category?.message}
            </span>
          )}
        </div>

        {/* Rating */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label
            style={{
              color: "var(--color-text)",
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Rating
          </label>
          <div
            style={{
              border: "2.5px solid var(--color-border)",
              borderRadius: "6px",
              background: "var(--color-bg)",
              padding: "10px 14px",
              display: "flex",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <RatingStars
              value={rating ?? 0}
              onChange={(value) =>
                form.setValue("rating", value, { shouldDirty: true })
              }
              size={24}
              style={{ gap: "4px" }}
            />
          </div>
        </div>

        {/* Divider */}
        <hr
          style={{
            border: "none",
            borderTop: "1.5px solid var(--color-border)",
            opacity: 0.2,
          }}
        />

        {/* Make Public toggle */}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            cursor: "pointer",
            border: "2px solid var(--color-border)",
            borderRadius: "8px",
            padding: "14px 16px",
            background: "var(--color-bg)",
            boxShadow: "3px 3px 0px var(--color-border)",
            color: "var(--color-text)",
            transition: "transform 0.15s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translate(-2px, -2px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translate(0, 0)")
          }
        >
          <input
            type="checkbox"
            {...form.register("is_public")}
            style={{
              marginTop: "2px",
              accentColor: "var(--color-accent)",
              width: "16px",
              height: "16px",
            }}
          />
          <div>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "block",
              }}
            >
              Make Public?
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: "var(--color-muted)",
                marginTop: "2px",
                display: "block",
              }}
            >
              Visible to everyone in the community.
            </span>
          </div>
        </label>

        {/* CTA */}
        <button
          type="submit"
          disabled={isPending}
          style={{
            background: "var(--color-accent)",
            color: "var(--color-border)",
            border: "2.5px solid var(--color-border)",
            borderRadius: "8px",
            padding: "16px 24px",
            fontSize: "0.8rem",
            fontWeight: 900,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: isPending ? "not-allowed" : "pointer",
            boxShadow: "8px 8px 0px var(--color-border)",
            transition: "transform 0.1s ease, box-shadow 0.1s ease",
            opacity: isPending ? 0.7 : 1,
            marginTop: "8px",
          }}
          onMouseEnter={(e) => {
            if (isPending) return;
            e.target.style.transform = "translate(-2px, -2px)";
            e.target.style.boxShadow = "10px 10px 0px var(--color-border)";
          }}
          onMouseLeave={(e) => {
            if (isPending) return;
            e.target.style.transform = "translate(0, 0)";
            e.target.style.boxShadow = "8px 8px 0px var(--color-border)";
          }}
          onMouseDown={(e) => {
            if (isPending) return;
            e.target.style.transform = "translate(4px, 4px)";
            e.target.style.boxShadow = "4px 4px 0px var(--color-border)";
          }}
          onMouseUp={(e) => {
            if (isPending) return;
            e.target.style.transform = "translate(-2px, -2px)";
            e.target.style.boxShadow = "10px 10px 0px var(--color-border)";
          }}
        >
          {isPending
            ? "Saving..."
            : isEditing
              ? "Update Prompt"
              : "Save Prompt"}
        </button>
      </aside>
    </form>
  );
}
