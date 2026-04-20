"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Heart,
  MapPin,
  GraduationCap,
  CalendarDays,
  BookOpen,
  ChevronRight,
  Star,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { schools } from "@/lib/mock/schools";
import { useWishlistStore } from "@/lib/store/wishlist";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StatusBar } from "@/components/shared/status-bar";

export default function SchoolDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const school = schools.find((s) => s.id === params.id);
  const hasSchool = useWishlistStore((s) => s.hasSchool);
  const toggle = useWishlistStore((s) => s.toggleSchool);

  if (!school) {
    return (
      <div className="p-8 text-center">
        <p>School not found.</p>
        <Button
          variant="primaryStudent"
          size="md"
          className="mt-4"
          onClick={() => router.push("/student/discover")}
        >
          Back to discover
        </Button>
      </div>
    );
  }

  const wishlisted = hasSchool(school.id);
  const spotsLow = school.spotsLeft <= 5;

  return (
    <div className="bg-bg">
      {/* Hero */}
      <div className="relative h-[300px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={school.imageUrl}
          alt={school.name}
          className="size-full object-cover"
        />
        {/* top gradient for status bar / chrome buttons */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-black/45 to-transparent" />
        {/* bottom gradient so white title stays readable on any theme */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        {/* status bar on top of image */}
        <div className="absolute inset-x-0 top-0">
          <StatusBar color="text-white" />
        </div>
        {/* back + heart */}
        <div className="absolute inset-x-0 top-[48px] flex items-center justify-between px-4">
          <button
            onClick={() => router.back()}
            aria-label="Back"
            className="flex size-[35px] items-center justify-center rounded-full bg-black/40 backdrop-blur text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => toggle(school.id)}
            aria-label="Wishlist"
            className="flex size-[35px] items-center justify-center rounded-full bg-black/40 backdrop-blur text-white"
          >
            <Heart size={18} fill={wishlisted ? "#fff" : "none"} />
          </button>
        </div>
        {/* spots-left badge */}
        <div
          className={cn(
            "absolute right-4 bottom-20 inline-flex h-[31px] items-center gap-1.5 rounded-full px-3",
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
        {/* title over image */}
        <div className="absolute inset-x-0 bottom-4 px-4 [text-shadow:_0_1px_4px_rgb(0_0_0_/_0.55)]">
          <h1 className="text-[28px] font-bold leading-[32px] text-white drop-shadow-md">
            {school.name}
          </h1>
          <div className="mt-2 flex items-center gap-1.5 text-[13px] text-white/90">
            <MapPin size={14} />
            {school.city}, {school.country}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* About */}
        <h2 className="h-section mt-6 text-fg">About</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
          {school.description}
        </p>

        {/* Mobility options */}
        <h2 className="h-section mt-7 text-fg">Mobility options</h2>
        <div className="mt-3 flex gap-3">
          {school.mobilityOptions.map((opt) => (
            <div
              key={opt.durationMonths}
              className="flex-1 rounded-[16px] bg-surface px-3 py-4 text-center ring-1 ring-divider"
            >
              <div className="flex justify-center text-fg-muted">
                <GraduationCap size={18} />
              </div>
              <div className="mt-2 text-[15px] font-bold text-fg">
                {opt.durationMonths} months
              </div>
              <div className="mt-1 text-[13px] text-fg-muted">
                € {formatPrice(opt.priceEur)}
              </div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <h2 className="h-section mt-7 text-fg">Highlights</h2>
        <Accordion.Root type="multiple" className="mt-3 flex flex-col gap-3">
          <HighlightItem
            value="admission"
            icon={<GraduationCap size={16} />}
            label="Admission"
            items={school.highlights.admission}
          />
          <HighlightItem
            value="schedule"
            icon={<CalendarDays size={16} />}
            label="School schedule"
            items={school.highlights.schoolSchedule}
          />
          <HighlightItem
            value="subjects"
            icon={<BookOpen size={16} />}
            label="Subjects and activities"
            items={school.highlights.subjectsAndActivities}
          />
        </Accordion.Root>

        {/* Coordinator */}
        <div className="mt-6 flex items-center gap-3 rounded-[20px] bg-student p-3 text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={school.coordinator.avatarUrl}
            alt=""
            className="size-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="text-[14px] font-semibold">
              Contact the coordinator
            </div>
            <div className="text-[13px] opacity-85">
              {school.coordinator.name}
            </div>
          </div>
          <ChevronRight size={20} />
        </div>

        {/* Gallery */}
        {school.galleryItems.length > 0 && (
          <>
            <h2 className="h-section mt-7 text-fg">Gallery</h2>
            <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
              {school.galleryItems.map((g) => (
                <div
                  key={g.id}
                  className="relative w-[260px] shrink-0 overflow-hidden rounded-[18px] bg-surface ring-1 ring-divider"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.imageUrl}
                    alt=""
                    className="h-[200px] w-full object-cover"
                  />
                  {g.caption && (
                    <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[12px] font-semibold text-white">
                      {g.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Testimonials */}
        {school.testimonials.length > 0 && (
          <>
            <h2 className="h-section mt-7 text-fg">Students we hosted</h2>
            <div className="mt-3 flex flex-col gap-3">
              {school.testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col gap-3 rounded-[20px] bg-surface p-4 ring-1 ring-divider"
                >
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.avatarUrl}
                      alt=""
                      className="size-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-[14px] font-bold text-fg">
                        {t.studentName}
                      </div>
                      <div className="text-[12px] text-fg-muted">
                        {t.year}, from {t.origin}
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill="#fbbf24"
                          className="text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[13px] text-fg-muted leading-relaxed">
                    {t.text}
                  </p>
                  <Button variant="primaryStudent" size="md" width="full">
                    Contact
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Apply CTA */}
        <div className="mt-8">
          <Button
            variant="primaryStudent"
            size="lg"
            width="full"
            asChild
          >
            <Link href={`/student/schools/${school.id}/apply`}>Apply</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function formatPrice(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function HighlightItem({
  value,
  icon,
  label,
  items,
}: {
  value: string;
  icon: React.ReactNode;
  label: string;
  items: string[];
}) {
  return (
    <Accordion.Item value={value} className="rounded-[16px] bg-surface ring-1 ring-divider">
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between px-4 py-4 text-left">
          <div className="flex items-center gap-2 text-[14px] font-semibold text-fg">
            <span className="text-student-accent">{icon}</span>
            {label}
          </div>
          <ChevronRight
            size={18}
            className="text-fg-muted transition-transform group-data-[state=open]:rotate-90"
          />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <ul className="flex flex-col gap-1.5 px-4 pb-4 text-[13px] text-fg-muted">
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 size-1 rounded-full bg-student-accent" />
              {it}
            </li>
          ))}
        </ul>
      </Accordion.Content>
    </Accordion.Item>
  );
}
