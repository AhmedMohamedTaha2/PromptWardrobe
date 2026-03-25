import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { ensureProfileExists } from "../lib/profile";
import { useAuth } from "./useAuth";

export const promptKeys = {
  all: (userId) => ["prompts", userId],
  list: (userId, filters) => ["prompts", userId, "list", filters],
  detail: (userId, promptId) => ["prompts", userId, promptId],
  publicList: (filters) => ["prompts", "public", filters],
  publicDetail: (promptId) => ["prompts", "public", promptId],
  upvotes: (promptId, userId) => ["prompt_upvotes", promptId, userId],
};

async function fetchPrompts(userId, { category, q }) {
  let query = supabase
    .from("prompts")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  if (q) {
    const like = `%${q}%`;
    query = query.ilike("title", like).ilike("content", like);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

async function fetchPrompt(userId, promptId) {
  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .eq("id", promptId)
    .single();
  if (error) throw error;
  return data;
}

async function fetchPublicPrompts({
  category,
  q,
  sort = "created_at",
  page = 1,
  pageSize = 12,
  authorId,
}) {
  let query = supabase
    .from("prompts")
    .select(
      `
        id,
        title,
        content,
        category,
        rating,
        is_public,
        created_at,
        user_id,
        profiles (
          user_id,
          display_name,
          avatar_url
        )
      `,
    )
    .eq("is_public", true)
    .order(sort, { ascending: false, nullsFirst: false });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  if (q) {
    const like = `%${q}%`;
    query = query.or(`title.ilike.${like},content.ilike.${like}`);
  }

  if (authorId) {
    query = query.eq("user_id", authorId);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

async function fetchPublicPrompt(promptId) {
  const { data, error } = await supabase
    .from("prompts")
    .select(
      `
        id,
        title,
        content,
        category,
        rating,
        is_public,
        created_at,
        user_id,
        notes,
        model,
        token_estimate,
        updated_at,
        published_at,
        profiles (
          user_id,
          display_name,
          avatar_url
        )
      `,
    )
    .eq("id", promptId)
    .single();
  if (error) throw error;
  return data;
}

async function fetchUpvoteState(promptId, userId) {
  const [{ count }, { data: userVote, error: voteError }] = await Promise.all([
    supabase
      .from("prompt_upvotes")
      .select("prompt_id", { count: "exact", head: true })
      .eq("prompt_id", promptId),
    userId
      ? supabase
          .from("prompt_upvotes")
          .select("prompt_id")
          .eq("prompt_id", promptId)
          .eq("user_id", userId)
          .maybeSingle()
      : Promise.resolve({ data: null, error: null }),
  ]);

  if (voteError) throw voteError;

  return {
    count: count ?? 0,
    hasUpvoted: Boolean(userVote?.prompt_id),
  };
}

export function usePrompts(userId, filters) {
  const enabled = Boolean(userId);
  return useQuery({
    queryKey: promptKeys.list(userId, filters),
    queryFn: () => fetchPrompts(userId, filters),
    enabled,
    placeholderData: (prev) => prev,
  });
}

export function usePrompt(userId, promptId) {
  const enabled = Boolean(userId && promptId);
  return useQuery({
    queryKey: promptKeys.detail(userId, promptId),
    queryFn: () => fetchPrompt(userId, promptId),
    enabled,
  });
}

export function usePublicPrompt(promptId) {
  return useQuery({
    queryKey: promptKeys.publicDetail(promptId),
    queryFn: () => fetchPublicPrompt(promptId),
    enabled: Boolean(promptId),
  });
}

export function usePublicPrompts(filters) {
  return useQuery({
    queryKey: promptKeys.publicList(filters),
    queryFn: () => fetchPublicPrompts(filters),
  });
}

export function usePromptMutations(userId) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (values) => {
      if (!userId) throw new Error("Not authenticated");
      await ensureProfileExists({ id: userId });
      const { data, error } = await supabase
        .from("prompts")
        .insert({ ...values, user_id: userId })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promptKeys.all(userId) });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, values }) => {
      const { data, error } = await supabase
        .from("prompts")
        .update(values)
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: promptKeys.all(userId) });
      queryClient.setQueryData(promptKeys.detail(userId, data.id), data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from("prompts")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promptKeys.all(userId) });
    },
  });

  return useMemo(
    () => ({ createMutation, updateMutation, deleteMutation }),
    [createMutation, updateMutation, deleteMutation],
  );
}

export function useUpvotes(promptId) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const stateQuery = useQuery({
    queryKey: promptKeys.upvotes(promptId, user?.id),
    queryFn: () => fetchUpvoteState(promptId, user?.id),
    enabled: Boolean(promptId),
  });

  const toggleMutation = useMutation({
    mutationFn: async (nextState) => {
      if (!user?.id) throw new Error("You must be logged in to upvote");
      if (nextState === "add") {
        const { error } = await supabase
          .from("prompt_upvotes")
          .insert({ prompt_id: promptId, user_id: user.id });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("prompt_upvotes")
          .delete()
          .eq("prompt_id", promptId)
          .eq("user_id", user.id);
        if (error) throw error;
      }
    },
    onMutate: async (nextState) => {
      await queryClient.cancelQueries({
        queryKey: promptKeys.upvotes(promptId, user?.id),
      });
      const prev = queryClient.getQueryData(
        promptKeys.upvotes(promptId, user?.id),
      );
      const optimistic = {
        count: Math.max(0, (prev?.count ?? 0) + (nextState === "add" ? 1 : -1)),
        hasUpvoted: nextState === "add",
      };
      queryClient.setQueryData(
        promptKeys.upvotes(promptId, user?.id),
        optimistic,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(
          promptKeys.upvotes(promptId, user?.id),
          ctx.prev,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: promptKeys.upvotes(promptId, user?.id),
      });
    },
  });

  return { ...stateQuery, toggleMutation };
}

export function useCreatePrompt() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (values) => {
      if (!user?.id) throw new Error("You must be logged in to create prompts");
      await ensureProfileExists(user);

      const { data, error } = await supabase
        .from("prompts")
        .insert({ ...values, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promptKeys.all(user.id) });
    },
  });
}

export function useUpdatePrompt() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, ...values }) => {
      const { data, error } = await supabase
        .from("prompts")
        .update(values)
        .eq("id", id)
        .eq("user_id", user?.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: promptKeys.all(user.id) });
        queryClient.setQueryData(promptKeys.detail(user.id, data.id), data);
      }
    },
  });
}

const PAGE_SIZE = 12;

export function usePublicPromptsFeed({ category, searchQuery } = {}) {
  return useInfiniteQuery({
    queryKey: ["prompts", "public-feed", { category, searchQuery }],
    queryFn: async ({ pageParam = 0 }) => {
      let query = supabase
        .from("prompts")
        .select(`
          id,
          title,
          content,
          category,
          rating,
          is_public,
          created_at,
          user_id,
          token_estimate,
          profiles (
            display_name,
            avatar_url
          )
        `)
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .range(pageParam * PAGE_SIZE, pageParam * PAGE_SIZE + PAGE_SIZE - 1);

      if (category && category !== "all") {
        query = query.eq("category", category);
      }

      if (searchQuery) {
        query = query.or(
          `title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });
}
