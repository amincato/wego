"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronLeft,
  Heart,
  MapPin,
  MessageCircle,
  Calendar,
} from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import { students } from "@/lib/mock/students";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useMessagesStore } from "@/lib/store/messages";
import { useUser } from "@/lib/hooks/use-user";
import { hostFamilies, DEMO_FAMILY_ID } from "@/lib/mock/families";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StatusBar } from "@/components/shared/status-bar";

const langFlags: Record<string, string> = {
  en: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
  it: "🇮🇹",
  es: "🇪🇸",
};

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const student = students.find((s) => s.id === id);
  const hasStudent = useWishlistStore((s) => s.hasStudent);
  const toggle = useWishlistStore((s) => s.toggleStudent);
  const user = useUser();
  const ensureThread = useMessagesStore((s) => s.ensureThreadBetween);
  const [tab, setTab] = useState("about");

  if (!student) return null;
  const wishlisted = hasStudent(student.id);

  const startChat = () => {
    const family =
      hostFamilies.find((f) => f.userId === user?.id) ??
      hostFamilies.find((f) => f.id === DEMO_FAMILY_ID)!;
    const thread = ensureThread(
      {
        userId: family.userId,
        name: family.familyName,
        avatarUrl: family.photoUrl,
        role: "family",
      },
      {
        userId: student.userId,
        name: `${student.firstName} ${student.lastName}`,
        avatarUrl: student.photoUrl,
        role: "student",
      },
    );
    router.push(`/family/chat/${thread.id}`);
  };

  return (
    <div className="bg-bg">
      {/* Hero */}
      <div className="relative h-[380px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={student.photoUrl}
          alt={student.firstName}
          className="size-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-black/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 top-0">
          <StatusBar color="text-white" />
        </div>
        <div className="absolute inset-x-0 top-[48px] flex items-center justify-between px-4">
          <button
            onClick={() => router.back()}
            aria-label="Back"
            className="flex size-[35px] items-center justify-center rounded-full bg-black/40 backdrop-blur text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => toggle(student.id)}
            aria-label="Wishlist"
            className="flex size-[35px] items-center justify-center rounded-full bg-black/40 backdrop-blur text-white"
          >
            <Heart size={18} fill={wishlisted ? "#fff" : "none"} />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-4 px-4 [text-shadow:_0_1px_4px_rgb(0_0_0_/_0.55)]">
          <h1 className="text-[28px] font-bold leading-[32px] text-white drop-shadow-md">
            {student.firstName} {student.lastName}, {student.age}
          </h1>
          <div className="mt-1 flex items-center gap-1 text-[13px] text-white/90">
            <MapPin size={13} />
            {student.city}
          </div>
        </div>
      </div>

      <div className="px-4 pb-10">
        {/* Tabs */}
        <Tabs.Root value={tab} onValueChange={setTab} className="mt-4">
          <Tabs.List className="flex gap-2 rounded-full bg-surface p-1 ring-1 ring-divider">
            {[
              { id: "about", label: "About" },
              { id: "lifestyle", label: "Lifestyle" },
              { id: "hobbies", label: "Hobbies" },
            ].map((t) => (
              <Tabs.Trigger
                key={t.id}
                value={t.id}
                className={cn(
                  "flex-1 rounded-full py-2 text-[13px] font-semibold transition",
                  tab === t.id
                    ? "bg-family text-white"
                    : "text-fg-muted",
                )}
              >
                {t.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value="about" className="mt-5">
            <p className="text-[14px] leading-relaxed text-fg-muted">
              {student.bio}
            </p>
            <h3 className="mt-5 text-[15px] font-bold text-fg">
              Mobility duration
            </h3>
            <div className="mt-2 flex items-center gap-2 text-[13px] text-fg-muted">
              <Calendar size={14} />
              {student.mobilityDurationMonths} months
            </div>
            <h3 className="mt-5 text-[15px] font-bold text-fg">Languages</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {student.languages.map((lang) => (
                <span
                  key={lang.code}
                  className="inline-flex h-8 items-center gap-1 rounded-full bg-chip px-3 text-[12px] font-semibold text-fg"
                >
                  <span>{langFlags[lang.code]}</span>
                  <span className="capitalize">{lang.level}</span>
                </span>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="lifestyle" className="mt-5">
            <div className="flex flex-col gap-3">
              <LifestyleRow
                icon="🏠"
                label="At home"
                value={student.lifestyle.atHome.replace(/_/g, " ")}
              />
              <LifestyleRow
                icon="👥"
                label="Social life"
                value={student.lifestyle.socialLife.replace(/_/g, " ")}
              />
              <LifestyleRow
                icon="🐾"
                label="Pets"
                value={student.lifestyle.pets.replace(/_/g, " ")}
              />
              <LifestyleRow
                icon="🌱"
                label="Daily habits"
                value={student.lifestyle.dailyHabits.replace(/_/g, " ")}
              />
              <LifestyleRow
                icon="🍕"
                label="Food & diet"
                value={student.lifestyle.foodDiet.replace(/_/g, " ")}
              />
            </div>
          </Tabs.Content>

          <Tabs.Content value="hobbies" className="mt-5">
            <div className="flex flex-wrap gap-2">
              {student.hobbies.map((h) => (
                <span
                  key={h}
                  className="inline-flex h-9 items-center rounded-full bg-chip px-4 text-[13px] font-semibold text-fg capitalize"
                >
                  {h.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </Tabs.Content>
        </Tabs.Root>

        <div className="mt-8">
          <Button
            variant="primaryFamily"
            size="lg"
            width="full"
            onClick={startChat}
          >
            <MessageCircle size={18} />
            Send a message
          </Button>
        </div>
      </div>
    </div>
  );
}

function LifestyleRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-[14px] bg-surface px-4 py-3 ring-1 ring-divider">
      <div className="flex items-center gap-2 text-[14px] text-fg-muted">
        <span className="text-lg">{icon}</span>
        {label}
      </div>
      <span className="text-[13px] font-semibold capitalize text-fg">
        {value}
      </span>
    </div>
  );
}
