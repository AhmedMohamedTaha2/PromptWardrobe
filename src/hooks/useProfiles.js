import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

const profileKeys = {
  profile: (userId) => ["profile", userId],
};

async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) throw error;
  return data;
}

export function useProfile(userId) {
  return useQuery({
    queryKey: profileKeys.profile(userId),
    queryFn: () => fetchProfile(userId),
    enabled: Boolean(userId),
  });
}
