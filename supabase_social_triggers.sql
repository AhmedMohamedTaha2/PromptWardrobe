-- Trigger to notify followers when a user posts a new public prompt
CREATE OR REPLACE FUNCTION public.handle_new_prompt_notification()
RETURNS TRIGGER AS $$
DECLARE
  author_name TEXT;
BEGIN
  -- Only notify if the prompt is public
  -- For INSERT: if is_public is true
  -- For UPDATE: if is_public changed from false to true
  IF NEW.is_public = true AND (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.is_public = false)) THEN
    
    -- Get author name
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

DROP TRIGGER IF EXISTS trg_new_prompt_notification ON public.prompts;
CREATE TRIGGER trg_new_prompt_notification
AFTER INSERT OR UPDATE ON public.prompts
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_prompt_notification();
