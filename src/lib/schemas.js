import { z } from "zod";

export const categories = [
  "general",
  "coding",
  "image_gen",
  "writing",
  "data_analysis",
  "research",
  "roleplay",
  "system_prompt",
];

export const promptSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  content: z
    .string({ required_error: "Content is required" })
    .min(1, "Content is required"),
  model: z.string().optional(),
  category: z.enum(categories),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
  token_estimate: z.number().optional(),
  is_public: z.boolean().default(false),
  published_at: z.string().nullable().optional(),
});
