# Fundraising Posts Feature

A new section where verified founders can publish blog-style posts announcing their next funding round, and visitors can browse them.

## User flows

- Visitor: visits `/fundraising-posts` → sees list of posts → clicks one → reads detail.
- Founder (signed in with `founder` role): same list, plus a "New post" button → fills form → publishes → can edit/delete own posts.
- Non-founder signed-in user: sees list/detail only; "Become a founder" hint on the new-post page.

## Pages & routes

- `/fundraising-posts` — public list (card grid, filter by sector, search by title/company).
- `/fundraising-posts/:slug` — public detail (cover, title, company, round badge, amount, deadline, content, tags, contact/pitch deck CTA, author).
- `/fundraising-posts/new` — protected, founders only. Form to create.
- `/fundraising-posts/:slug/edit` — protected, only post owner.

Add a "Raising next round" card on Company detail linking to the founder's latest post (if any).

## Data model (Lovable Cloud / Supabase)

1. `app_role` enum: `admin`, `founder`, `user`.
2. `user_roles` table (`user_id`, `role`) + `has_role(uuid, app_role)` security definer function. Used by RLS — no role data on `profiles`.
3. `fundraising_posts` table:
   - `id`, `author_id` (auth.users), `slug` (unique), `title`, `content` (markdown/long text), `excerpt`
   - `company_name`, `company_slug` (optional — link to existing Company)
   - `round_type` (Pre-Seed / Seed / Series A / Series B+ / Bridge / Other)
   - `target_amount_usd` (numeric), `min_ticket_usd` (numeric, optional)
   - `deadline` (date)
   - `cover_url` (text — points to Storage bucket)
   - `tags` (text[]) — sector tags
   - `contact_email`, `pitch_deck_url`, `website_url`
   - `status` (`draft` | `published`), `published_at`, `created_at`, `updated_at`

4. RLS policies:
   - SELECT published posts → `anon`, `authenticated` (anyone can read).
   - INSERT → `authenticated` AND `has_role(auth.uid(),'founder')` AND `author_id = auth.uid()`.
   - UPDATE/DELETE → `authenticated` AND `author_id = auth.uid()`.
   - `user_roles`: SELECT for authenticated (own rows); admin-only writes (manual seeding for now).

5. Storage bucket `fundraising-covers` (public read) with RLS allowing founders to upload to a folder named after their `auth.uid()`.

## Implementation steps

1. Migration: create enum, `user_roles`, `has_role` function, `fundraising_posts` table with GRANTs + RLS + `set_updated_at` trigger.
2. Create storage bucket + RLS policies for covers.
3. Frontend:
   - `src/pages/FundraisingPosts.tsx` (list + filter)
   - `src/pages/FundraisingPostDetail.tsx`
   - `src/pages/FundraisingPostForm.tsx` (new + edit)
   - `src/components/fundraising/PostCard.tsx`, `CoverUpload.tsx`
   - Zod validation for form (title ≤120, content ≤10k, amount ≥0, deadline future, etc.)
   - Hook `useFounderRole()` checking `user_roles`.
4. Routing in `src/App.tsx` + a "Fundraising Posts" link in Navbar (between Investors and Compare).
5. Add "Raising next round" highlight block on `CompanyDetail` querying latest published post matching company slug.
6. Optional seed: a way for the current user to self-assign the `founder` role from a Settings link — or admin-only via SQL. Plan: provide a small "Request founder access" toast for now; founder role granted by admin manually (insert via supabase tool).

## Notes for the user

- Roles are stored in a separate `user_roles` table (security best practice). Initially no one has the `founder` role; after the feature ships you can tell me which account email should become a founder and I will grant it.
- Cover images are stored in Lovable Cloud storage; bucket will be public-read so posts render fast.
- Posts are public once `status = published`; drafts are visible only to their author.
