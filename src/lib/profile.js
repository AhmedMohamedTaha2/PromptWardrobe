import { supabase } from "./supabase";

export async function ensureProfileExists(user) {
  if (!user?.id) {
    throw new Error("User is not available to create profile");
  }

  const { data: existing, error: existingError } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingError && existingError.code !== "PGRST116") {
    throw existingError;
  }

  if (existing?.user_id) return existing;

  const profilePayload = { user_id: user.id };

  const displayName =
    user.user_metadata?.full_name ??
    (user.email ? user.email.split("@")[0] : null);

  if (displayName) {
    profilePayload.display_name = displayName;
  }

  if (user.user_metadata?.avatar_url) {
    profilePayload.avatar_url = user.user_metadata.avatar_url;
  }

  if (user.email) {
    profilePayload.email_public = user.email;
  }

  const { data: created, error: insertError } = await supabase
    .from("profiles")
    .insert(profilePayload)
    .select("user_id")
    .single();

  if (insertError) throw insertError;

  return created;
}
