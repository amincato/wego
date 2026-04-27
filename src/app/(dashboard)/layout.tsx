import { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DashboardRouteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
