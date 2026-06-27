import { ChevronRight } from "lucide-react";
import type { PageType } from "../config/navigation";
import { breadcrumbMap } from "../config/navigation";

interface BreadcrumbProps {
  currentPage: PageType;
}

export function Breadcrumb({ currentPage }: BreadcrumbProps) {
  const breadcrumbs = breadcrumbMap[currentPage] ?? [];

  return (
    <div className="flex items-center gap-1.5 flex-1 min-w-0">
      {breadcrumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <ChevronRight className="w-3 h-3 text-muted-foreground/50 flex-shrink-0" />
          )}
          <span
            className={`text-[12px] truncate ${
              i === breadcrumbs.length - 1
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            {crumb}
          </span>
        </span>
      ))}
    </div>
  );
}
