import { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-[20px] bg-surface px-6 py-10 text-center ring-1 ring-divider">
      {icon && (
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-chip text-fg-muted">
          {icon}
        </div>
      )}
      <div className="text-[16px] font-bold text-fg">{title}</div>
      {description && (
        <p className="mt-1.5 text-[13px] text-fg-muted">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
