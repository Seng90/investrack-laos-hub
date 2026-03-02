
## Plan: Featured Companies Section + Company Logo Images

### 1. Add logo field to company data
Update `src/data/companies.ts`:
- Add a `logo` field to the `Company` interface (string URL)
- Populate each company with a professional placeholder logo using `https://ui-avatars.com/api/` (generates letter-based avatars with custom colors and rounded shapes) or `https://logo.clearbit.com/` style URLs
- This gives each company a unique, professional-looking circular logo image

### 2. Create Featured Companies section on Companies page
Add a new "Featured Companies" highlight section between the hero header and the search/filter bar in `src/pages/Companies.tsx`:
- Select the top 3 companies (BCEL, Lao Telecom, Kolao Group -- highest funding) as "featured"
- Display them in larger, more prominent showcase cards in a horizontal row
- Each featured card includes:
  - Company logo image (round, larger size ~16x16)
  - Company name, sector badge, and stage tag
  - Full description (not truncated)
  - Key metrics: Funding, Employees, Founded, Location
  - Latest news headline
  - Prominent "View Profile" CTA button
- Cards use a gradient background, subtle border glow, and framer-motion stagger animations
- Section header: "Featured Companies" with a star/trophy icon

### 3. Replace letter avatars with logo images everywhere
Update both the `CompanyCard` component and the `FeaturedCompanies.tsx` homepage component:
- Replace the `div` showing `company.name.charAt(0)` with an `<img>` tag using the new `logo` field
- Add an `onError` fallback that shows the letter initial if the image fails to load
- Style logos with rounded corners and a subtle shadow

### 4. Update FeaturedCompanies homepage component
Update `src/components/FeaturedCompanies.tsx` to also use logo images instead of letter avatars, keeping consistency across the site.

### Technical Details

**Company logos**: Will use `https://ui-avatars.com/api/?name=BCEL&background=1a365d&color=fff&size=128&bold=true&format=png` style URLs per company -- these generate real images dynamically based on company name with custom brand colors. This avoids needing to upload actual logo files while still looking professional.

**Featured card layout**: Uses a 3-column grid (`lg:grid-cols-3`) with cards that are taller and more detailed than the regular directory cards. On mobile, they stack vertically.

**Files to modify**:
- `src/data/companies.ts` -- add `logo` field to interface and data
- `src/pages/Companies.tsx` -- add Featured section, update CompanyCard to use logos
- `src/components/FeaturedCompanies.tsx` -- update to use logo images

**No new dependencies needed** -- uses existing framer-motion, lucide-react, and standard img tags.
