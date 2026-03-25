import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export function useModelStats(userId) {
  return useQuery({
    queryKey: ["model-stats", userId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_model_usage_stats", {
        target_user_id: userId,
      });

      if (error) throw error;
      return data ?? [];
    },
    enabled: Boolean(userId),
  });
}
