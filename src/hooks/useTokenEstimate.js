import { useMemo } from "react";
import { encode } from "gpt-tokenizer";

export function useTokenEstimate(content) {
  const count = useMemo(() => {
    if (!content) return 0;
    try {
      return encode(content).length;
    } catch (error) {
      console.error("Token estimate failed", error);
      return 0;
    }
  }, [content]);

  const confidence = useMemo(() => {
    if (count === 0) return "Low";
    if (count < 400) return "High";
    if (count < 1200) return "Medium";
    return "Low";
  }, [count]);

  return { count, confidence };
}
