import { describe, it, expect } from "vitest";
import { promptSchema } from "./schemas";

describe("promptSchema", () => {
  it("validates a correct prompt", () => {
    const validPrompt = {
      title: "Test Prompt",
      content: "Do something",
      category: "coding",
      is_public: false,
    };
    const result = promptSchema.safeParse(validPrompt);
    expect(result.success).toBe(true);
  });

  it("requires title", () => {
    const invalidPrompt = {
      title: "",
      content: "Do something",
      category: "coding",
    };
    const result = promptSchema.safeParse(invalidPrompt);
    expect(result.success).toBe(false);
    expect(
      result.error.issues.some((i) => i.message === "Title is required"),
    ).toBe(true);
  });

  it("requires content", () => {
    const invalidPrompt = {
      title: "Test Prompt",
      content: "",
      category: "coding",
    };
    const result = promptSchema.safeParse(invalidPrompt);
    expect(result.success).toBe(false);
    expect(
      result.error.issues.some((i) => i.message === "Content is required"),
    ).toBe(true);
  });

  it("validates category enum", () => {
    const invalidPrompt = {
      title: "Test Prompt",
      content: "Content",
      category: "invalid_category",
    };
    const result = promptSchema.safeParse(invalidPrompt);
    expect(result.success).toBe(false);
    expect(result.error.issues.some((i) => i.path.includes("category"))).toBe(
      true,
    );
  });
});
