"use client";

import Link from "next/link";
import { useWishlistStore } from "@/lib/store/wishlist";
import { students } from "@/lib/mock/students";
import { StatusBar } from "@/components/shared/status-bar";
import { MapPin } from "lucide-react";

export default function FamilyConnectionsPage() {
  const ids = useWishlistStore((s) => s.studentIds);
  const wishlisted = students.filter((s) => ids.includes(s.id));

  return (
    <>
      <StatusBar />
      <div className="px-4">
        <h1 className="h-display text-fg">Connections</h1>
        <p className="mt-1 text-[14px] text-fg-muted">
          Students you&apos;ve expressed interest in.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          {wishlisted.length === 0 && (
            <div className="rounded-[20px] bg-surface p-8 text-center text-fg-muted ring-1 ring-divider">
              No connections yet. Save students from Discover to see them here.
            </div>
          )}
          {wishlisted.map((s) => (
            <Link
              key={s.id}
              href={`/family/students/${s.id}`}
              className="flex items-center gap-3 rounded-[16px] bg-surface p-3 ring-1 ring-divider"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.photoUrl}
                alt={s.firstName}
                className="size-14 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold text-fg">
                  {s.firstName} {s.lastName}, {s.age}
                </div>
                <div className="flex items-center gap-1 text-[12px] text-fg-muted">
                  <MapPin size={12} />
                  {s.city}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
