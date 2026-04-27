"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";
import { AirplaneProgressBar } from "@/components/brand/airplane-progress-bar";
import { Button } from "@/components/ui/button";

/**
 * Shared shell used for all signup / onboarding steps.
 * Light background (#F5F5F5), back button, airplane progress bar, big title,
 * scrollable body and a sticky "Continue" (or custom) footer CTA.
 */
export function WizardShell({
  backHref,
  onBack,
  progress,
  title,
  children,
  primaryLabel = "Continue",
  primaryDisabled,
  primaryOnClick,
  secondaryLabel,
  secondaryOnClick,
  variant = "student",
}: {
  backHref?: string;
  onBack?: () => void;
  progress: number;
  title: string;
  children: ReactNode;
  primaryLabel?: string;
  primaryDisabled?: boolean;
  primaryOnClick?: () => void;
  secondaryLabel?: string;
  secondaryOnClick?: () => void;
  variant?: "student" | "family";
}) {
  const accentColor = variant === "student" ? "#547BE0" : "#ff7834";
  const primaryVariant =
    variant === "student" ? "primaryStudent" : "primaryFamily";
  const outlineVariant =
    variant === "student" ? "outlineStudent" : "outlineFamily";
  return (
    <div className="relative min-h-dvh bg-bg pt-[59px]">
      <div className="flex items-center px-4">
        {backHref ? (
          <Link
            href={backHref}
            aria-label="Back"
            className="inline-flex size-[35px] items-center justify-center rounded-full bg-surface shadow-sm ring-1 ring-divider"
          >
            <ChevronLeft size={20} className="text-fg" />
          </Link>
        ) : onBack ? (
          <button
            onClick={onBack}
            aria-label="Back"
            className="inline-flex size-[35px] items-center justify-center rounded-full bg-surface shadow-sm ring-1 ring-divider"
          >
            <ChevronLeft size={20} className="text-fg" />
          </button>
        ) : (
          <div className="size-[35px]" />
        )}
      </div>

      <div className="mt-7 px-4">
        <AirplaneProgressBar progress={progress} color={accentColor} />
      </div>

      <h1 className="h-title mt-6 px-4 text-fg">{title}</h1>

      <div className="px-4 pt-6 pb-[140px]">{children}</div>

      <div className="absolute inset-x-0 bottom-6 flex flex-col gap-3 px-4">
        {secondaryLabel && (
          <Button
            variant={outlineVariant}
            size="lg"
            width="full"
            onClick={secondaryOnClick}
          >
            {secondaryLabel}
          </Button>
        )}
        <Button
          variant={primaryVariant}
          size="lg"
          width="full"
          disabled={primaryDisabled}
          onClick={primaryOnClick}
        >
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
}
