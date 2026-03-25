import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export function useUpdateAccount(user) {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      if (!user?.id) throw new Error("Not authenticated");

      const payload = {};
      if (email && email !== user.email) {
        payload.email = email;
      }
      if (password) {
        payload.password = password;
      }

      if (!payload.email && !payload.password) {
        throw new Error("Enter a new email or password to update");
      }

      const { data, error } = await supabase.auth.updateUser(payload);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Account updated");
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to update account");
    },
  });
}
