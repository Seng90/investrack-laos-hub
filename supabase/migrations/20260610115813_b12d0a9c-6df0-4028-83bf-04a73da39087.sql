
CREATE TABLE public.tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  active boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX tags_name_lower_idx ON public.tags (lower(name));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.tags TO authenticated;
GRANT SELECT ON public.tags TO anon;
GRANT ALL ON public.tags TO service_role;

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active tags are public" ON public.tags
  FOR SELECT USING (active = true);

CREATE POLICY "Creators can view their own tags" ON public.tags
  FOR SELECT TO authenticated USING (auth.uid() = created_by);

CREATE POLICY "Admins can view all tags" ON public.tags
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Founders can create tags" ON public.tags
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by AND public.has_role(auth.uid(), 'founder'));

CREATE POLICY "Creators can update their own tags" ON public.tags
  FOR UPDATE TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins can update any tag" ON public.tags
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Creators can delete their own tags" ON public.tags
  FOR DELETE TO authenticated USING (auth.uid() = created_by);

CREATE TRIGGER tags_set_updated_at
  BEFORE UPDATE ON public.tags
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
