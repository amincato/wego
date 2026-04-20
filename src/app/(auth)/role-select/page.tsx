"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plane, Home, Users } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { useSignupStore } from "@/lib/store/signup";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

type RoleCard = {
  role: Role;
  title: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  iconBg: string;
};

const roles: RoleCard[] = [
  {
    role: "student",
    title: "Exchange Student",
    description:
      "Discover partner schools abroad and apply for your exchange experience.",
    Icon: Plane,
    accent: "text-student",
    iconBg: "bg-student",
  },
  {
    role: "family",
    title: "Host family",
    description:
      "Welcome an international student at home and share your culture.",
    Icon: Home,
    accent: "text-family",
    iconBg: "bg-family",
  },
  {
    role: "both",
    title: "Both",
    description: "Send your child abroad and host an international student.",
    Icon: Users,
    accent: "text-both",
    iconBg: "bg-both",
  },
];

export default function RoleSelectPage() {
  const router = useRouter();
  const setAccount = useSignupStore((s) => s.setAccount);
  const setRole = useAuthStore((s) => s.setRole);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-student px-4 pb-10 pt-[59px]">
      {/* Top chrome */}
      <div className="flex items-center justify-between">
        <Link
          href="/welcome"
          aria-label="Back"
          className="inline-flex size-[35px] items-center justify-center rounded-full bg-white/50"
        >
          <ChevronLeft size={20} className="text-text-dark" />
        </Link>
        <div className="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-xl">
          🇬🇧
        </div>
      </div>

      <h1 className="mt-16 max-w-[260px] text-[24px] font-bold leading-[30px] text-white">
        Which type of user are you?
      </h1>

      <div className="mt-10 flex flex-col gap-4">
        {roles.map(({ role, title, description, Icon, accent, iconBg }) => (
          <button
            key={role}
            onClick={() => {
              setRole(role);
              setAccount({ role });
              router.push("/signup/name");
            }}
            className={cn(
              "flex items-center gap-4 rounded-[24px] bg-white px-5 py-8 text-left shadow-md transition active:scale-[0.98]",
            )}
          >
            <div
              className={cn(
                "flex size-14 shrink-0 items-center justify-center rounded-2xl text-white",
                iconBg,
              )}
            >
              <Icon size={26} />
            </div>
            <div className="flex-1 min-w-0">
              <div className={cn("text-[20px] font-bold leading-7", accent)}>
                {title}
              </div>
              <p className="mt-1 text-sm leading-tight text-text-dark">
                {description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
