import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export function useUpdateProfile(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates) => {
      if (!userId) throw new Error("Not authenticated");

      console.log(
        "[useUpdateProfile] updating userId:",
        userId,
        "with:",
        updates,
      );

      const { data, error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      toast.success("Profile updated successfully");
    },
    onError: (err) => {
      toast.error(`Failed to save: ${err.message}`);
    },
  });
}
