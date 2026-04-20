"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon } from "lucide-react";

export default function FamilyOnboardingIntroPage() {
  return (
    <div className="relative min-h-dvh bg-family flex flex-col items-center justify-center px-6 text-center">
      <div className="flex size-[96px] items-center justify-center rounded-full bg-white/15">
        <div className="flex size-[72px] items-center justify-center rounded-full bg-white">
          <HomeIcon size={32} className="text-family" strokeWidth={2.5} />
        </div>
      </div>
      <h1 className="mt-10 text-[28px] font-bold leading-tight text-white">
        Set up your host family profile
      </h1>
      <p className="mt-3 max-w-[260px] text-[14px] text-white/90">
        Share what makes your home special so students can get to know you.
      </p>

      <div className="absolute inset-x-0 bottom-8 px-4">
        <Button
          variant="whitePill"
          size="lg"
          width="full"
          asChild
          className="!text-family"
        >
          <Link href="/onboarding/family/home">Let&apos;s start</Link>
        </Button>
      </div>
    </div>
  );
}
