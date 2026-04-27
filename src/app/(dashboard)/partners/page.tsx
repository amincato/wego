import Link from "next/link";
import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { SchoolCard } from "@/components/dashboard/school-card";
import { schools } from "@/lib/mock/schools";

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        title="Partner schools"
        subtitle="The international network of schools we collaborate with."
        action={
          <Link
            href="/partners/destinations"
            className="inline-flex items-center gap-2 rounded-full bg-school px-4 py-2 text-sm font-bold text-white hover:bg-school-accent"
          >
            <MapPin className="size-4" />
            View destinations map
          </Link>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {schools.map((s) => (
          <SchoolCard key={s.id} school={s} />
        ))}
      </div>
    </>
  );
}
