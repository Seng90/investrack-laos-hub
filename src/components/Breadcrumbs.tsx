import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-medium transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="inline-flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            {item.href ? (
              <Link
                to={item.href}
                className="rounded-md px-2 py-1 font-medium transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span className="px-2 py-1 font-medium text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
