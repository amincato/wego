import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  count?: number;
  description?: string;
  action?: { label: string; href: string };
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  count,
  description,
  action,
  children,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "rounded-card-lg bg-surface p-5 ring-1 ring-divider",
        className,
      )}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="h-section text-fg flex items-center gap-2">
            {title}
            {typeof count === "number" ? (
              <span className="rounded-full bg-chip px-2 py-0.5 text-xs font-bold text-fg-muted">
                {count}
              </span>
            ) : null}
          </h2>
          {description ? (
            <p className="t-caption mt-0.5 text-fg-subtle">{description}</p>
          ) : null}
        </div>
        {action ? (
          <Link
            href={action.href}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-student hover:bg-student/10"
          >
            {action.label}
            <ArrowUpRight className="size-3.5" />
          </Link>
        ) : null}
      </header>
      {children}
    </section>
  );
}
