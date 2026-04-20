"use client";

import Link from "next/link";
import { Heart, MapPin, Clock } from "lucide-react";
import { School } from "@/lib/types";
import { useWishlistStore } from "@/lib/store/wishlist";
import { cn } from "@/lib/utils";

export function SchoolCard({ school }: { school: School }) {
  const hasSchool = useWishlistStore((s) => s.hasSchool);
  const toggle = useWishlistStore((s) => s.toggleSchool);
  const wishlisted = hasSchool(school.id);
  const durations = school.mobilityOptions
    .map((m) => m.durationMonths)
    .join(", ");

  const spotsLow = school.spotsLeft <= 5;

  return (
    <Link
      href={`/student/schools/${school.id}`}
      className="relative block overflow-hidden rounded-[20px] bg-surface ring-1 ring-divider"
    >
      <div className="relative h-[190px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={school.imageUrl}
          alt={school.name}
          className="size-full object-cover"
        />
        {/* Spots-left badge */}
        <div
          className={cn(
            "absolute right-4 top-4 inline-flex h-[31px] items-center gap-1.5 rounded-full px-3",
            spotsLow ? "bg-danger-bg" : "bg-success-bg",
          )}
        >
          <span
            className={cn(
              "size-[5px] rounded-full",
              spotsLow ? "bg-danger-fg" : "bg-success-fg",
            )}
          />
          <span
            className={cn(
              "text-[13px] font-semibold",
              spotsLow ? "text-danger-fg" : "text-success-fg",
            )}
          >
            {school.spotsLeft} spots left
          </span>
        </div>
        {/* Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(school.id);
          }}
          aria-label="Wishlist"
          className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-black/40 backdrop-blur text-white hover:bg-black/55"
        >
          <Heart
            size={18}
            fill={wishlisted ? "#ffffff" : "none"}
            className={wishlisted ? "text-white" : "text-white"}
          />
        </button>
      </div>

      <div className="px-4 pt-3 pb-4">
        <h3 className="h-section text-fg">{school.name}</h3>
        <div className="mt-2 flex items-center gap-1.5 text-[13px] text-fg-muted">
          <MapPin size={14} />
          {school.city}, {school.country}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[13px] text-fg-muted">
          <Clock size={14} />
          Mobility duration: {durations} months
        </div>
      </div>
    </Link>
  );
}
