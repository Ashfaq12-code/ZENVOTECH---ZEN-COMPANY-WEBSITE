-- ============================================================
-- ZENVORA — Add project_type column to projects table
-- Run this in your Supabase SQL Editor ONCE before deploying
-- ============================================================

ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS project_type text NOT NULL DEFAULT 'web'
CHECK (project_type IN ('web', 'app', 'desktop'));

ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS created_by_admin text;

-- All existing projects will automatically become type 'web'
-- Update the notification trigger to include project type & creator admin name
CREATE OR REPLACE FUNCTION public.notify_admins_of_content()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  notification_kind text;
  notification_title text;
  notification_message text;
BEGIN
  IF tg_table_name = 'projects' THEN
    notification_kind := 'project';
    notification_title := 'New ' || upper(new.project_type) || ' project added';
    notification_message := coalesce(new.created_by_admin, 'An admin') || ' added ' || new.name || ' (' || new.country || ')';
  ELSE
    notification_kind := 'review';
    notification_title := 'New client review';
    notification_message := new.name || ' · ' || new.rating || ' star review';
  END IF;

  INSERT INTO public.admin_notifications (owner_id, kind, title, message, record_id)
  SELECT user_id, notification_kind, notification_title, notification_message, new.id
  FROM public.admin_accounts;
  RETURN new;
END;
$$;
