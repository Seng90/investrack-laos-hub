import { Link } from "react-router-dom";
import { Calendar, Target } from "lucide-react";

export interface PostCardData {
  slug: string;
  title: string;
  excerpt: string | null;
  company_name: string;
  round_type: string;
  target_amount_usd: number | null;
  deadline: string | null;
  cover_url: string | null;
  tags: string[];
  published_at: string | null;
}

const formatAmount = (v: number | null) => {
  if (!v) return null;
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v}`;
};

const PostCard = ({ post }: { post: PostCardData }) => (
  <Link
    to={`/fundraising-posts/${post.slug}`}
    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent hover:shadow-lg"
  >
    <div className="aspect-[16/9] overflow-hidden bg-secondary">
      {post.cover_url ? (
        <img
          src={post.cover_url}
          alt={post.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-primary/10">
          <span className="font-display text-4xl font-bold text-accent/60">
            {post.company_name.charAt(0)}
          </span>
        </div>
      )}
    </div>
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-accent">
          {post.round_type}
        </span>
        <span className="text-xs text-muted-foreground">{post.company_name}</span>
      </div>
      <h3 className="font-display text-lg font-semibold leading-snug text-foreground group-hover:text-accent">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground">
        {formatAmount(post.target_amount_usd) && (
          <span className="inline-flex items-center gap-1">
            <Target className="h-3.5 w-3.5" />
            {formatAmount(post.target_amount_usd)}
          </span>
        )}
        {post.deadline && (
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.deadline).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  </Link>
);

export default PostCard;
