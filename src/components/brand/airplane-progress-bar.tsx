"use client";

import { cn } from "@/lib/utils";

/**
 * Progress bar signature of wego: a horizontal line that is filled as progress
 * advances, with a tiny paper airplane marker that "flies" at the progress tip.
 * Used in the signup wizard (account) and in the onboarding wizards (profile).
 */
export function AirplaneProgressBar({
  progress,
  className,
  color = "#6475e9",
  trackColor = "#e5e5e5",
}: {
  progress: number; // 0..1
  className?: string;
  color?: string;
  trackColor?: string;
}) {
  const p = Math.min(1, Math.max(0, progress));
  return (
    <div className={cn("relative h-4 w-full", className)}>
      {/* track */}
      <div
        className="absolute inset-x-0 top-[50%] h-[2px] rounded-full"
        style={{ background: trackColor }}
      />
      {/* filled */}
      <div
        className="absolute left-0 top-[50%] h-[2px] rounded-full transition-[width] duration-500 ease-out"
        style={{ background: color, width: `${p * 100}%` }}
      />
      {/* airplane marker (paper plane icon, tinted via CSS mask so it follows `color`) */}
      <div
        aria-hidden
        className="absolute top-[50%] h-[28px] w-[32px] -translate-x-1/2 -translate-y-1/2 transition-[left] duration-500 ease-out"
        style={{
          left: `${p * 100}%`,
          backgroundColor: color,
          WebkitMaskImage: "url(/icona_aereo.tif.png)",
          maskImage: "url(/icona_aereo.tif.png)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </div>
  );
}
