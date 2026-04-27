import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Users } from "lucide-react";
import type { School } from "@/lib/types";

const LANGUAGE_LABEL: Record<School["language"], string> = {
  it: "Italian",
  fr: "French",
  de: "German",
  es: "Spanish",
  en: "English",
};

export function SchoolCard({ school }: { school: School }) {
  return (
    <Link
      href={`/partners/${school.id}`}
      className="group flex flex-col overflow-hidden rounded-card-lg bg-surface ring-1 ring-divider transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-chip">
        <Image
          src={school.imageUrl}
          alt={school.name}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-bg/90 px-2.5 py-1 text-[11px] font-bold text-fg ring-1 ring-divider">
          <MapPin className="size-3 text-school" />
          {school.city}, {school.country}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-fg">{school.name}</h3>
          <ArrowUpRight className="size-4 text-fg-subtle group-hover:text-school" />
        </div>
        <p className="line-clamp-2 text-sm text-fg-muted">{school.description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <span className="rounded-full bg-chip px-2.5 py-0.5 text-[11px] font-bold text-fg-muted capitalize">
            {school.orientation}
          </span>
          <span className="rounded-full bg-chip px-2.5 py-0.5 text-[11px] font-bold text-fg-muted">
            {LANGUAGE_LABEL[school.language]}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-xs text-fg-muted">
            <Users className="size-3" />
            {school.spotsLeft} spots left
          </span>
        </div>
      </div>
    </Link>
  );
}
