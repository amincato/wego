import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function InfoCard({
  title,
  children,
  className,
  action,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-card-lg bg-surface p-5 ring-1 ring-divider",
        className,
      )}
    >
      {title ? (
        <header className="mb-4 flex items-center justify-between gap-3">
          <h3 className="h-section text-fg">{title}</h3>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function InfoRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-divider/60 py-2 last:border-b-0">
      <span className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
        {label}
      </span>
      <span className="min-w-0 flex-1 text-right text-sm font-semibold text-fg">
        {value}
      </span>
    </div>
  );
}

export function InfoGrid({
  items,
  columns = 2,
}: {
  items: { label: string; value: ReactNode }[];
  columns?: 2 | 3;
}) {
  return (
    <dl
      className={cn(
        "grid gap-x-6 gap-y-3",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3",
      )}
    >
      {items.map((it) => (
        <div key={it.label} className="flex flex-col gap-0.5">
          <dt className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {it.label}
          </dt>
          <dd className="text-sm font-semibold text-fg">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
