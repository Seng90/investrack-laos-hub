export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

export const uniqueSlug = (title: string) =>
  `${slugify(title)}-${Math.random().toString(36).slice(2, 7)}`;
