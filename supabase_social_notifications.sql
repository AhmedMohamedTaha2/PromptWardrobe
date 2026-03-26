-- SQL Migration: Follow Creator + Notification System Logic

-- 1. Function to handle new prompt notifications
CREATE OR REPLACE FUNCTION public.handle_new_prompt_notification()
RETURNS TRIGGER AS $$
DECLARE
  author_name TEXT;
BEGIN
  -- Only notify if the prompt is public and it's a new publish
  IF NEW.is_public = true AND (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.is_public = false)) THEN
    
    -- Get author name for the notification payload
    SELECT display_name INTO author_name FROM public.profiles WHERE user_id = NEW.user_id;
    IF author_name IS NULL THEN
      author_name := 'Unknown User';
    END IF;

    -- Insert notifications for all followers
    INSERT INTO public.notifications (user_id, type, payload)
    SELECT
      follower_id,
      'new_prompt',
      jsonb_build_object(
        'prompt_id', NEW.id,
        'prompt_title', NEW.title,
        'title', NEW.title,
        'author_id', NEW.user_id,
        'creator_id', NEW.user_id,
        'author_name', author_name
      )
    FROM public.follows
    WHERE following_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger for new prompts
DROP TRIGGER IF EXISTS trg_new_prompt_notification ON public.prompts;
CREATE TRIGGER trg_new_prompt_notification
AFTER INSERT OR UPDATE ON public.prompts
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_prompt_notification();

-- 3. RLS Policies for Follows
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view follows" ON public.follows;
CREATE POLICY "Anyone can view follows"
ON public.follows FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Users can follow others" ON public.follows;
CREATE POLICY "Users can follow others"
ON public.follows FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = follower_id);

DROP POLICY IF EXISTS "Users can unfollow others" ON public.follows;
CREATE POLICY "Users can unfollow others"
ON public.follows FOR DELETE
TO authenticated
USING (auth.uid() = follower_id);

-- 4. RLS Policies for Notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
CREATE POLICY "Users can view own notifications"
ON public.notifications FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
CREATE POLICY "Users can update own notifications"
ON public.notifications FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 5. Enable Realtime for notifications
-- (Runs on Supabase to ensure the publication includes the table)
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
