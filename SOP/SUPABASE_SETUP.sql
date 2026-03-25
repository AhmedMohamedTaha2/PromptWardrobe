-- ============================================
-- PROMPTS WARDROBE - DATABASE SETUP SCRIPT
-- ============================================
-- Run this script in your Supabase SQL Editor
-- Navigate to: https://app.supabase.com -> Your Project -> SQL Editor
-- ============================================

-- Create the prompts table
CREATE TABLE IF NOT EXISTS public.prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  model TEXT,
  category TEXT NOT NULL DEFAULT 'general' CHECK (
    category IN (
      'general',
      'coding',
      'image_gen',
      'writing',
      'data_analysis',
      'research',
      'roleplay',
      'system_prompt'
    )
  ),
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  token_estimate INTEGER,
  -- Phase 2.6 additions
  is_public BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_prompts_user_id ON public.prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_prompts_category ON public.prompts(category);
CREATE INDEX IF NOT EXISTS idx_prompts_created_at ON public.prompts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prompts_updated_at ON public.prompts(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_prompts_is_public_published
  ON public.prompts(is_public, published_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow users to view their own prompts OR any public prompt
DROP POLICY IF EXISTS "Users can view own prompts" ON public.prompts;
DROP POLICY IF EXISTS "Anyone can view public prompts" ON public.prompts;
CREATE POLICY "Users can view own prompts" ON public.prompts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public prompts" ON public.prompts
  FOR SELECT
  USING (is_public = true);

-- Allow users to insert their own prompts
CREATE POLICY "Users can insert own prompts" ON public.prompts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own prompts
CREATE POLICY "Users can update own prompts" ON public.prompts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own prompts
CREATE POLICY "Users can delete own prompts" ON public.prompts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to auto-update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function on every update
CREATE TRIGGER prompts_updated_at
  BEFORE UPDATE ON public.prompts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- Phase 2.6: Social + Public features
-- ============================================

-- prompt_upvotes table
CREATE TABLE IF NOT EXISTS public.prompt_upvotes (
  prompt_id UUID NOT NULL REFERENCES public.prompts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (prompt_id, user_id)
);

ALTER TABLE public.prompt_upvotes ENABLE ROW LEVEL SECURITY;

-- RLS: allow reads for everyone (needed for counts and public feeds)
DROP POLICY IF EXISTS "Read upvotes" ON public.prompt_upvotes;
CREATE POLICY "Read upvotes" ON public.prompt_upvotes
  FOR SELECT
  USING (true);

-- Only the authenticated user can insert/delete their own vote
DROP POLICY IF EXISTS "Insert own upvote" ON public.prompt_upvotes;
CREATE POLICY "Insert own upvote" ON public.prompt_upvotes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Delete own upvote" ON public.prompt_upvotes;
CREATE POLICY "Delete own upvote" ON public.prompt_upvotes
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_prompt_upvotes_prompt_id ON public.prompt_upvotes(prompt_id);
CREATE INDEX IF NOT EXISTS idx_prompt_upvotes_user_id ON public.prompt_upvotes(user_id);

-- follows table
CREATE TABLE IF NOT EXISTS public.follows (
  follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, following_id)
);

ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Read follows" ON public.follows;
CREATE POLICY "Read follows" ON public.follows
  FOR SELECT
  USING (auth.uid() IS NOT NULL AND (auth.uid() = follower_id OR auth.uid() = following_id));

DROP POLICY IF EXISTS "Insert follow" ON public.follows;
CREATE POLICY "Insert follow" ON public.follows
  FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

DROP POLICY IF EXISTS "Delete follow" ON public.follows;
CREATE POLICY "Delete follow" ON public.follows
  FOR DELETE
  USING (auth.uid() = follower_id);

CREATE INDEX IF NOT EXISTS idx_follows_follower ON public.follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON public.follows(following_id);

-- profiles table (publicly readable)
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  email_public TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read profiles" ON public.profiles;
CREATE POLICY "Public read profiles" ON public.profiles
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Upsert own profile" ON public.profiles;
CREATE POLICY "Upsert own profile" ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Update own profile" ON public.profiles;
CREATE POLICY "Update own profile" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Delete own profile" ON public.profiles;
CREATE POLICY "Delete own profile" ON public.profiles
  FOR DELETE
  USING (auth.uid() = user_id);

-- trigger for updated_at on profiles
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Read own notifications" ON public.notifications;
CREATE POLICY "Read own notifications" ON public.notifications
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Insert own notifications" ON public.notifications;
CREATE POLICY "Insert own notifications" ON public.notifications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Update own notifications" ON public.notifications;
CREATE POLICY "Update own notifications" ON public.notifications
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Delete own notifications" ON public.notifications;
CREATE POLICY "Delete own notifications" ON public.notifications
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(user_id, read_at);

-- Notify users when they gain a new follower
CREATE OR REPLACE FUNCTION public.handle_new_follow_notification()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, payload)
  VALUES (
    NEW.following_id,
    'new_follower',
    jsonb_build_object('follower_id', NEW.follower_id)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_new_follow_notification ON public.follows;
CREATE TRIGGER trg_new_follow_notification
AFTER INSERT ON public.follows
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_follow_notification();

-- Optional: backfill published_at for any existing public prompts
UPDATE public.prompts
SET published_at = coalesce(published_at, created_at)
WHERE is_public = true AND published_at IS NULL;

-- ============================================
-- Phase 2.6 setup complete
-- ============================================

-- ============================================
-- Phase 3.1: Bookmarks Feature
-- ============================================

CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES public.prompts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, prompt_id)
);

-- Enable RLS
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Users can view own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can view own bookmarks" ON public.bookmarks
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can insert own bookmarks" ON public.bookmarks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can delete own bookmarks" ON public.bookmarks
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_created_at ON public.bookmarks(created_at DESC);


-- ============================================
-- Phase 3.2: Model Usage Stats Optimization
-- ============================================

-- Function to get model usage stats for a specific user
CREATE OR REPLACE FUNCTION public.get_model_usage_stats(target_user_id UUID)
RETURNS TABLE (
  model TEXT,
  count BIGINT
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(p.model, 'Unspecified') as model,
    COUNT(*) as count
  FROM public.prompts p
  WHERE p.user_id = target_user_id
  GROUP BY p.model
  ORDER BY count DESC;
END;
$$;

-- Allow authenticated users to call this function
GRANT EXECUTE ON FUNCTION public.get_model_usage_stats(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_model_usage_stats(UUID) TO service_role;
