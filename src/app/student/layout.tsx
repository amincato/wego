import { ReactNode } from "react";
import { BottomNav } from "@/components/shared/bottom-nav";
import { MobileFrame } from "@/components/shared/mobile-frame";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <MobileFrame>
      <div className="relative flex min-h-dvh flex-col bg-bg text-fg">
        <div className="flex-1 pb-4">{children}</div>
        <BottomNav variant="student" basePath="/student" />
      </div>
    </MobileFrame>
  );
}
