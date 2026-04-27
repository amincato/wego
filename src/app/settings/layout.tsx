import { ReactNode } from "react";
import { MobileFrame } from "@/components/shared/mobile-frame";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return <MobileFrame>{children}</MobileFrame>;
}
