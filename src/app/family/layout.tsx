import { ReactNode } from "react";
import { BottomNav } from "@/components/shared/bottom-nav";

export default function FamilyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <div className="pb-[120px]">{children}</div>
      <BottomNav variant="family" basePath="/family" />
    </div>
  );
}
