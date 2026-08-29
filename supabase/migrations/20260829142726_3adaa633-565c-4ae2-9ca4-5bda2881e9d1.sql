
CREATE OR REPLACE FUNCTION public.increment_post_view(post_slug text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.posts
  SET view_count = view_count + 1
  WHERE slug = post_slug AND status = 'published';
$$;

REVOKE ALL ON FUNCTION public.increment_post_view(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_post_view(text) TO anon, authenticated, service_role;
