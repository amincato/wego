"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  FileText,
  Users,
  MessageCircle,
  User,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

const studentItems: NavItem[] = [
  { label: "Discover", href: "/discover", Icon: Compass },
  { label: "Applications", href: "/applications", Icon: FileText },
  { label: "Community", href: "/community", Icon: Users },
  { label: "Chat", href: "/chat", Icon: MessageCircle },
  { label: "Profile", href: "/profile", Icon: User },
];

const familyItems: NavItem[] = [
  { label: "Discover", href: "/discover", Icon: Compass },
  { label: "Connections", href: "/connections", Icon: LinkIcon },
  { label: "Community", href: "/community", Icon: Users },
  { label: "Chat", href: "/chat", Icon: MessageCircle },
  { label: "Profile", href: "/profile", Icon: User },
];

export function BottomNav({
  variant,
  basePath,
}: {
  variant: "student" | "family";
  basePath: string;
}) {
  const pathname = usePathname();
  const items = variant === "student" ? studentItems : familyItems;
  const accent = variant === "student" ? "text-student" : "text-family";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 mx-auto w-full max-w-[393px]">
      <div className="pointer-events-auto relative mx-4 mb-6 flex items-center justify-between rounded-full border border-divider bg-nav/90 px-3 py-3 backdrop-blur-xl shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]">
        {items.map(({ label, href, Icon }) => {
          const full = `${basePath}${href}`;
          const active =
            pathname === full ||
            pathname.startsWith(full + "/") ||
            (href === "/discover" && pathname === basePath);
          if (active) {
            return (
              <Link
                key={href}
                href={full}
                className={cn(
                  "flex items-center gap-2 rounded-full bg-bg px-4 py-2.5 font-bold shadow-sm",
                  accent,
                )}
              >
                <Icon size={18} />
                <span className="text-sm">{label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={href}
              href={full}
              className="flex size-10 items-center justify-center text-fg-muted hover:text-fg"
              aria-label={label}
            >
              <Icon size={22} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
