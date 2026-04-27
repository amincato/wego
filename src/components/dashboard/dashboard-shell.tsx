import { ReactNode } from "react";
import { SidebarNav } from "./sidebar-nav";
import { Topbar } from "./topbar";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-scope flex min-h-dvh w-full">
      <SidebarNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-6 py-6 lg:px-10 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="h-display text-fg">{title}</h1>
        {subtitle ? (
          <p className="t-body text-fg-muted mt-1">{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
