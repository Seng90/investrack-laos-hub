-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'founder', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fundraising posts
CREATE TABLE public.fundraising_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  company_name text NOT NULL,
  company_slug text,
  round_type text NOT NULL,
  target_amount_usd numeric,
  min_ticket_usd numeric,
  deadline date,
  cover_url text,
  tags text[] NOT NULL DEFAULT '{}',
  contact_email text,
  pitch_deck_url text,
  website_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX fundraising_posts_status_published_at_idx
  ON public.fundraising_posts (status, published_at DESC);
CREATE INDEX fundraising_posts_author_idx
  ON public.fundraising_posts (author_id);

GRANT SELECT ON public.fundraising_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fundraising_posts TO authenticated;
GRANT ALL ON public.fundraising_posts TO service_role;

ALTER TABLE public.fundraising_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are public"
  ON public.fundraising_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authors can view their own posts"
  ON public.fundraising_posts FOR SELECT TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Founders can create posts"
  ON public.fundraising_posts FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = author_id
    AND public.has_role(auth.uid(), 'founder')
  );

CREATE POLICY "Authors can update their own posts"
  ON public.fundraising_posts FOR UPDATE TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts"
  ON public.fundraising_posts FOR DELETE TO authenticated
  USING (auth.uid() = author_id);

CREATE TRIGGER fundraising_posts_set_updated_at
  BEFORE UPDATE ON public.fundraising_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Storage bucket policies (bucket created via tool)
CREATE POLICY "Public can read fundraising covers"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'fundraising-covers');

CREATE POLICY "Founders can upload own covers"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'fundraising-covers'
    AND public.has_role(auth.uid(), 'founder')
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Owners can update own covers"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'fundraising-covers'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Owners can delete own covers"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'fundraising-covers'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
