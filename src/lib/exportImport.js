import { z } from "zod";

const promptSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  model: z.string().nullable().optional(),
  category: z.string(),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  notes: z.string().nullable().optional(),
  token_estimate: z.number().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

const exportSchema = z.array(promptSchema);

export async function exportPrompts(supabase, userId) {
  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  const payload = exportSchema.parse(data ?? []);
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const date = new Date().toISOString().split("T")[0];
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `prompts-wardrobe-export-${date}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  return payload.length;
}

export async function importPrompts(file, supabase, userId) {
  const text = await file.text();
  const parsed = exportSchema.parse(JSON.parse(text));
  const { data, error } = await supabase
    .from("prompts")
    .upsert(
      parsed.map((prompt) => ({ ...prompt, user_id: userId })),
      {
        onConflict: "id",
      },
    )
    .select();
  if (error) throw error;
  return data?.length ?? 0;
}
