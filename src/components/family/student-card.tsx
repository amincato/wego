"use client";

import Link from "next/link";
import { Heart, Clock } from "lucide-react";
import type { StudentProfile } from "@/lib/types";
import { useWishlistStore } from "@/lib/store/wishlist";
import { cn } from "@/lib/utils";

const langFlags: Record<string, string> = {
  en: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
  it: "🇮🇹",
  es: "🇪🇸",
};

const nationalityFlag: Record<string, string> = {
  it: "🇮🇹",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  gb: "🇬🇧",
};

export function StudentCard({ student }: { student: StudentProfile }) {
  const hasStudent = useWishlistStore((s) => s.hasStudent);
  const toggle = useWishlistStore((s) => s.toggleStudent);
  const wishlisted = hasStudent(student.id);

  return (
    <Link
      href={`/family/students/${student.id}`}
      className="relative block overflow-hidden rounded-[20px] bg-surface ring-1 ring-divider"
    >
      <div className="relative h-[220px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={student.photoUrl}
          alt={student.firstName}
          className="size-full object-cover"
        />
        {/* Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(student.id);
          }}
          aria-label="Wishlist"
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/40 backdrop-blur text-white hover:bg-black/55"
        >
          <Heart
            size={18}
            fill={wishlisted ? "#ffffff" : "none"}
            className="text-white"
          />
        </button>
        {/* Nationality flag */}
        <div className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-xl">
          {nationalityFlag[student.nationality]}
        </div>
      </div>

      <div className="px-4 pt-3 pb-4">
        <h3 className="h-section text-fg">
          {student.firstName}, {student.age}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-[13px] text-fg-muted">
          <Clock size={14} />
          Mobility: {student.mobilityDurationMonths} months
        </div>

        {/* languages chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {student.languages.slice(0, 3).map((lang) => (
            <span
              key={lang.code}
              className={cn(
                "inline-flex h-7 items-center gap-1 rounded-full bg-chip px-2.5 text-[11px] font-semibold text-fg",
              )}
            >
              <span>{langFlags[lang.code]}</span>
              <span className="capitalize">{lang.level.slice(0, 3)}</span>
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
